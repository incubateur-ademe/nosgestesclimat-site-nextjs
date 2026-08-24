import { prisma } from '@nosgestesclimat/core/prisma/client'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import logger from '../src/logger.ts'

const args = yargs(hideBin(process.argv))
  .boolean('apply')
  .alias('a', 'apply')
  .default('apply', false)
  .parse()

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

const main = async () => {
  try {
    const { apply } = await args

    const before = await countOrphans()
    logger.info('Orphaned VerifiedUsers (no matching User)', {
      before,
      mode: apply ? 'apply' : 'dry-run',
    })

    if (apply) {
      const result = await prisma.$queryRaw<{ count: string }[]>`
        WITH backfilled AS (
          INSERT INTO ngc."User" (id, name, email, "createdAt", "updatedAt")
          SELECT vu.id, vu.name, vu.email, vu."createdAt", vu."updatedAt"
          FROM ngc."VerifiedUser" vu
          LEFT JOIN ngc."User" u ON u.id = vu.id
          WHERE u.id IS NULL
          RETURNING id
        )
        SELECT COUNT(*)::text FROM backfilled
      `
      logger.info('Backfilled User records', {
        count: result?.[0]?.count ?? '0',
      })
    } else {
      logger.info(
        'Dry run: nothing written. Re-run with --apply to create the User records.'
      )
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
