import { prisma } from '@nosgestesclimat/core/prisma/client'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const args = yargs(hideBin(process.argv))
  .boolean('dry')
  .alias('d', 'dry')
  .default('dry', true)
  .parse()

const { dry } = await args

const DeletionMessage = dry
  ? 'Dry mode enabled: read-only mode'
  : 'Dry mode disabled: updating the DB'

const verifiedUsersWithoutLastActivityAt = await prisma.verifiedUser.findMany({
  where: {
    user: {
      lastActivityAt: null,
    },
  },
})

console.log(
  `${verifiedUsersWithoutLastActivityAt.length} VerifiedUsers with no lastActivityAt'`
)

const findLatestUpdatedAtAmongLinkedCollectionForUser = (userId: string) =>
  prisma.$queryRawUnsafe<{ updatedAt: Date }>(
    `
  SELECT MAX(updatedAt)
  FROM ngc."Users" u
  LEFT JOIN ngc."GroupAdministrator" ON ngc."GroupAdministrator".userId = $1
  LEFT JOIN ngc."GroupParticipant" ON ngc."GroupParticipant".userId = $1
  LEFT JOIN ngc."OrganisationAdministrator" ON ngc."OrganisationAdministrator".userId = $1
  LEFT JOIN ngc."Simulation" ON ngc."Simulation".userId = $1
  LEFT JOIN ngc."VerificationCode" v ON u.email = v.email
  LEFT JOIN ngc."RefreshToken" r ON u.id = r.userId
  WHERE u.id = $1 AND u.lastActivityAt = null
  `,
    userId
  )
