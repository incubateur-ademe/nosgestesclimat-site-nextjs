import { prisma } from '@nosgestesclimat/core/prisma/client'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

export async function addLastActivityAtToUser(dry: boolean | undefined = true) {
  console.log('Updating users by setting their lastActivityAt date')

  const deletionMessage = dry
    ? 'Dry mode enabled: read-only mode'
    : 'Dry mode disabled: updating the DB'

  console.log(deletionMessage)

  const [{ candidates_count, updated_count }] = await prisma.$queryRawUnsafe<
    {
      candidates_count: bigint
      updated_count: bigint
    }[]
  >(
    /* sql */
    `
    WITH target AS (
      SELECT u.id
        FROM ngc."User" u
       WHERE u."lastActivityAt" IS NULL
         AND EXISTS (
           SELECT 1 FROM ngc."VerifiedUser" vu WHERE vu.id = u.id
         )
    ),
    linked AS (
      SELECT u.id AS user_id, u."updatedAt" AS latest
        FROM ngc."User" u
        JOIN target t ON t.id = u.id

      UNION ALL
      SELECT ga."userId", ga."updatedAt"
        FROM ngc."GroupAdministrator" ga
        JOIN target t ON t.id = ga."userId"

      UNION ALL
      SELECT gp."userId", gp."updatedAt"
        FROM ngc."GroupParticipant" gp
        JOIN target t ON t.id = gp."userId"

      UNION ALL
      SELECT s."userId", s."updatedAt"
        FROM ngc."Simulation" s
        JOIN target t ON t.id = s."userId"
       WHERE s."userId" IS NOT NULL

      UNION ALL
      SELECT rt."userId", rt."createdAt"
        FROM ngc."RefreshToken" rt
        JOIN target t ON t.id = rt."userId"

      UNION ALL
      SELECT vu.id, oa."updatedAt"
        FROM ngc."OrganisationAdministrator" oa
        JOIN ngc."VerifiedUser" vu ON vu.email = oa."userEmail"
        JOIN target t ON t.id = vu.id

      UNION ALL
      SELECT vu.id, vc."updatedAt"
        FROM ngc."VerificationCode" vc
        JOIN ngc."VerifiedUser" vu ON vu.email = vc.email
        JOIN target t ON t.id = vu.id
    ),
    latest AS (
      SELECT user_id, MAX(latest) AS latest
        FROM linked
       GROUP BY user_id
    ),
    updated AS (
      UPDATE ngc."User" u
         SET "lastActivityAt" = l.latest
        FROM latest l
       WHERE u.id = l.user_id
        -- Prevent update if dry mode is enabled
        AND NOT $1::boolean
      RETURNING u.id
   )
   SELECT
     (SELECT COUNT(*) FROM latest)  AS candidates_count,
     (SELECT COUNT(*) FROM updated) AS updated_count
  `,
    dry
  )

  console.log(
    `${candidates_count} User(s) with no lastActivityAt, ${updated_count} updated`
  )
}

const isMain =
  process.argv[1] && import.meta.url === `file://${process.argv[1]}`

if (isMain) {
  const args = yargs(hideBin(process.argv))
    .boolean('dry')
    .alias('d', 'dry')
    .default('dry', true)
    .parse()

  const { dry } = await args

  addLastActivityAtToUser(dry)
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}
