import { prisma } from '@nosgestesclimat/core/prisma/client'
import { randomUUID } from 'node:crypto'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import logger from '../src/logger.ts'

const args = yargs(hideBin(process.argv))
  .boolean('apply')
  .alias('a', 'apply')
  .default('apply', false)
  .parse()

type Orphan = {
  id: string
  email: string
  name: string | null
  createdAt: Date
  updatedAt: Date
}

const countOrphans = async (): Promise<string> => {
  const [{ count }] = await prisma.$queryRaw<{ count: bigint }[]>`
    SELECT COUNT(*) FROM (
      SELECT vu.id
      FROM ngc."VerifiedUser" vu
      LEFT JOIN ngc."User" u ON u.id = vu.id
      WHERE u.id IS NULL
    ) orphaned
  `
  return count.toString()
}

const fetchOrphans = async (): Promise<Orphan[]> => {
  return prisma.$queryRaw<Orphan[]>`
    SELECT vu.id, vu.email, vu.name, vu."createdAt", vu."updatedAt"
    FROM ngc."VerifiedUser" vu
    LEFT JOIN ngc."User" u ON u.id = vu.id
    WHERE u.id IS NULL
  `
}

const main = async () => {
  try {
    const { apply } = await args

    const before = await countOrphans()
    logger.info('Orphaned VerifiedUsers (no matching User)', {
      before,
      mode: apply ? 'apply' : 'dry-run',
    })

    const orphans = await fetchOrphans()

    // Group orphans by id to detect pre-NGC-3770 duplicates (same id, different emails).
    const groupsById = new Map<string, Orphan[]>()
    for (const o of orphans) {
      const list = groupsById.get(o.id) ?? []
      list.push(o)
      groupsById.set(o.id, list)
    }

    const uniqueGroups: Orphan[] = []
    const duplicateGroups: Orphan[][] = []
    for (const group of groupsById.values()) {
      if (group.length === 1) {
        uniqueGroups.push(group[0]!)
      } else {
        // Keep the oldest as canonical, reassign fresh UUIDs to the rest.
        group.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
        duplicateGroups.push(group)
      }
    }

    logger.info('Orphan analysis', {
      totalOrphans: orphans.length,
      uniqueIds: uniqueGroups.length + duplicateGroups.length,
      uniqueIdOrphans: uniqueGroups.length,
      duplicateIdGroups: duplicateGroups.length,
    })

    for (const group of duplicateGroups) {
      logger.warn(
        'Duplicate id among orphans (keeping oldest, reassigning others)',
        {
          id: group[0]!.id,
          emails: group.map((g) => g.email),
        }
      )
    }

    if (!apply) {
      logger.info('Dry run: nothing written. Re-run with --apply to backfill.')
    } else {
      const toInsert: Orphan[] = [...uniqueGroups]
      // Old ids of reassigned duplicate groups — their RefreshTokens are
      // invalidated so the previous JWTs (which still carry the old id) can
      // no longer be refreshed. Both the reassigned and the canonical user
      // are forced to re-login; this is intentional to prevent account
      // confusion between two users that previously shared an id.
      const reassignedOldIds: string[] = []

      if (duplicateGroups.length) {
        await prisma.$transaction(async (tx) => {
          for (const group of duplicateGroups) {
            const keep = group[0]!
            reassignedOldIds.push(keep.id)
            toInsert.push(keep)
            for (const dup of group.slice(1)) {
              const newId = randomUUID()
              await tx.$executeRaw`
                UPDATE ngc."VerifiedUser"
                SET id = ${newId}
                WHERE email = ${dup.email}
              `
              toInsert.push({
                ...dup,
                id: newId,
              })
            }
          }

          await tx.user.createMany({
            data: toInsert.map((o) => ({
              id: o.id,
              email: o.email,
              name: o.name,
              createdAt: o.createdAt,
              updatedAt: o.updatedAt,
            })),
            skipDuplicates: true,
          })

          if (reassignedOldIds.length) {
            const { count: revoked } = await tx.refreshToken.deleteMany({
              where: { userId: { in: reassignedOldIds } },
            })
            logger.info('Revoked RefreshTokens for reassigned duplicate ids', {
              ids: reassignedOldIds,
              revoked,
            })
          }
        })
      } else {
        await prisma.user.createMany({
          data: toInsert.map((o) => ({
            id: o.id,
            email: o.email,
            name: o.name,
            createdAt: o.createdAt,
            updatedAt: o.updatedAt,
          })),
          skipDuplicates: true,
        })
      }

      logger.info('Backfilled User records', { count: toInsert.length })
    }

    const after = await countOrphans()
    logger.info('Orphaned VerifiedUsers after backfill', { after })

    process.exit(0)
  } catch (e) {
    logger.error(e)
    process.exit(1)
  }
}

main()
