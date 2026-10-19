import { simulationFactory } from '@nosgestesclimat/core/features/simulations/factories/simulation.factory'
import { userFactory } from '@nosgestesclimat/core/features/users/factories/user.factory'
import { prisma } from '@nosgestesclimat/core/prisma/client'
import { emptyDatabase } from '@nosgestesclimat/core/test-utils/empty-database'
import { afterEach, describe, expect, it } from 'vitest'
import { addLastActivityAtToUser } from '../add-last-activity-at-to-user.ts'

describe('addLastActivityAt', () => {
  afterEach(async () => {
    await emptyDatabase(prisma)
  })

  it('should not update the lastActivityAt user prop if dry mode is enabled', async () => {
    const user1 = await userFactory.verified().create()
    const user2 = await userFactory.verified().create()

    await addLastActivityAtToUser()

    const user1FromDB = await prisma.user.findFirst({
      where: {
        id: user1.id,
      },
    })
    const user2FromDB = await prisma.user.findFirst({
      where: {
        id: user2.id,
      },
    })

    expect(user1FromDB?.lastActivityAt).toBeNull()
    expect(user2FromDB?.lastActivityAt).toBeNull()
  })

  it("should set the lastActivityAt to the most recent update date among a user's linked documents", async () => {
    const anteriorDate = new Date('1979-10-10')
    const lessAnteriorDate = new Date('1979-10-10')

    const user1 = await userFactory
      .verified()
      .params({
        updatedAt: anteriorDate,
      })
      .create()
    const user2 = await userFactory
      .verified()
      .params({
        updatedAt: anteriorDate,
      })
      .create()

    await simulationFactory
      .params({
        updatedAt: lessAnteriorDate,
        userId: user1.id,
      })
      .create()

    await simulationFactory
      .params({
        updatedAt: lessAnteriorDate,
        userId: user2.id,
      })
      .create()

    await addLastActivityAtToUser(false)

    const user1FromDB = await prisma.user.findFirst({
      where: {
        id: user1.id,
      },
    })
    const user2FromDB = await prisma.user.findFirst({
      where: {
        id: user2.id,
      },
    })

    expect(user1FromDB?.lastActivityAt).toEqual(lessAnteriorDate)
    expect(user2FromDB?.lastActivityAt).toEqual(lessAnteriorDate)
  })

  it('should not update the lastActivityAt date of a user that already has one', async () => {
    const alreadyDefinedDate = new Date('1979-10-10')

    const user1 = await userFactory
      .verified()
      .params({ lastActivityAt: alreadyDefinedDate })
      .create()
    const user2 = await userFactory
      .verified()
      .params({ lastActivityAt: alreadyDefinedDate })
      .create()

    await simulationFactory
      .params({
        userId: user1.id,
      })
      .create()

    await simulationFactory
      .params({
        userId: user2.id,
      })
      .create()

    await addLastActivityAtToUser(false)

    const user1FromDB = await prisma.user.findFirst({
      where: {
        id: user1.id,
      },
    })
    const user2FromDB = await prisma.user.findFirst({
      where: {
        id: user2.id,
      },
    })

    expect(user1FromDB?.lastActivityAt).toEqual(alreadyDefinedDate)
    expect(user2FromDB?.lastActivityAt).toEqual(alreadyDefinedDate)
  })
})
