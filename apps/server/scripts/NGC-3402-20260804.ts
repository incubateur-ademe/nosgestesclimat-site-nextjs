import dotenv from 'dotenv'
import { randomUUID } from 'node:crypto'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import logger, { maskEmail } from '../src/logger.ts'

dotenv.config({ quiet: true })

// Imported lazily so DATABASE_URL (loaded above) is set when the Prisma
// client is instantiated.
const { prisma } = await import('@nosgestesclimat/core/prisma/client')

/**
 * Reassigns a unique id to every `VerifiedUser` sharing the same session id.
 *
 * Background: until the "one session id = one account" fix, the signup path
 * reused the incoming session userId as `VerifiedUser.id` without any
 * uniqueness check. `id` is not unique in the schema, so several accounts
 * ended up attached to the same id, which later made the signin guard reject
 * them with a 403.
 *
 * For each group of accounts sharing an id, one account keeps the id (the one
 * matching the `User` row, which owns profiles/sessions, falling back to the
 * oldest account) and the others get a fresh uuid. Their `User` rows are
 * created and their simulations re-pointed to the new id, so FK references
 * (`Simulation.userId`, `RefreshToken.userId`) stay consistent.
 *
 * Run it AFTER the auth fix is deployed (see commit "Enforce the one session
 * userId = one account invariant"), otherwise the previous client/server can
 * immediately recreate duplicates. It is idempotent: a second run is a no-op.
 *
 * Usage (from apps/server):
 *   NODE_ENV=development node --experimental-strip-types ./scripts/NGC-3402-20260804.ts          # dry run (default)
 *   NODE_ENV=development node --experimental-strip-types ./scripts/NGC-3402-20260804.ts --no-dry  # apply
 */
const findDuplicatedIdGroups = () =>
  prisma.$queryRaw<{ id: string; count: string }[]>`
    SELECT id, COUNT(*)::text AS count
    FROM ngc."VerifiedUser"
    GROUP BY id
    HAVING COUNT(*) > 1
  `

const main = async () => {
  const { dry } = await yargs(hideBin(process.argv))
    .boolean('dry')
    .alias('d', 'dry')
    .default('dry', true)
    .describe('dry', 'Preview the changes without applying them')
    .parse()

  try {
    const groups = await findDuplicatedIdGroups()
    logger.info('Found duplicated session ids', {
      dry,
      groups: groups.length,
    })

    let reassigned = 0

    for (const { id } of groups) {
      const verifiedUsers = await prisma.verifiedUser.findMany({
        where: { id },
        orderBy: { createdAt: 'asc' },
        select: {
          email: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
      })

      const user = await prisma.user.findUnique({
        where: { id },
        select: { email: true },
      })

      // One account keeps the session id: the one matching the `User` row
      // (profiles and refresh-token sessions reference it), falling back to
      // the oldest account.
      const ownerEmail =
        verifiedUsers.find(({ email }) => email === user?.email)?.email ??
        verifiedUsers[0]?.email

      for (const verifiedUser of verifiedUsers) {
        if (verifiedUser.email === ownerEmail) {
          logger.info('Keeps its session id', {
            email: maskEmail(verifiedUser.email),
            id,
          })
          continue
        }

        const newId = randomUUID()
        reassigned++

        if (!dry) {
          await prisma.$transaction(async (tx) => {
            // `Simulation.userId` and `RefreshToken.userId` reference
            // `User.id`; create the target row before re-pointing.
            await tx.user.create({
              data: {
                id: newId,
                email: verifiedUser.email,
                name: verifiedUser.name,
                createdAt: verifiedUser.createdAt,
                updatedAt: verifiedUser.updatedAt,
              },
            })

            await tx.simulation.updateMany({
              where: { userId: id, userEmail: verifiedUser.email },
              data: { userId: newId },
            })

            await tx.verifiedUser.update({
              where: { email: verifiedUser.email },
              data: { id: newId },
            })
          })
        }

        logger.info(dry ? 'Would reassign a new id' : 'Reassigned a new id', {
          email: maskEmail(verifiedUser.email),
          from: id,
          to: newId,
        })
      }
    }

    const remaining = await prisma.$queryRaw<{ count: string }[]>`
      SELECT COUNT(*)::text AS count
      FROM (
        SELECT id
        FROM ngc."VerifiedUser"
        GROUP BY id
        HAVING COUNT(*) > 1
      ) sub
    `
    logger.info('Finished', {
      dry,
      reassigned,
      remainingDuplicatedIds: remaining[0]?.count ?? '0',
    })
    process.exit(0)
  } catch (error) {
    logger.error(error)
    process.exit(1)
  }
}

main()
