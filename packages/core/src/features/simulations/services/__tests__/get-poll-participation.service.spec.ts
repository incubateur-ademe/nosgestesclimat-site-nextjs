import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { prisma } from '../../../../prisma/client.ts'
import { organisationFactory } from '../../../polls/factories/organisation.factory.ts'
import { pollFactory } from '../../../polls/factories/poll.factory.ts'
import { userFactory } from '../../../users/factories/user.factory.ts'
import { simulationFactory } from '../../factories/simulation.factory.ts'
import type { ComputedResults } from '../../validators/computed-results.schema.ts'
import { getPollParticipation } from '../get-poll-participation.service.ts'

vi.mock('../../helpers/migrate-simulation.ts', () => ({
  migrateSimulationIfNeeded: vi.fn((simulation) => simulation),
}))

describe('getPollParticipation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(async () => {
    await prisma.simulationPoll.deleteMany()
    await prisma.poll.deleteMany()
    await prisma.organisation.deleteMany()
    await prisma.simulation.deleteMany()
    await prisma.user.deleteMany()
  })

  it('returns null when the user has no simulation attached to the poll', async () => {
    const [user, organisation] = await Promise.all([
      userFactory.create(),
      organisationFactory.create(),
    ])
    const poll = await pollFactory.withOrganisation(organisation.id).create()

    const result = await getPollParticipation({
      userId: user.id,
      pollIdOrSlug: poll.id,
    })

    expect(result).toBeNull()
  })

  it('resolves the poll by id', async () => {
    const [user, organisation] = await Promise.all([
      userFactory.create(),
      organisationFactory.create(),
    ])
    const poll = await pollFactory.withOrganisation(organisation.id).create()
    const simulation = await simulationFactory
      .withModelRegion('FR')
      .withProgression(0.5)
      .params({ userId: user.id, computedResults: validComputedResults })
      .create()
    await attachToPoll({ simulationId: simulation.id, pollId: poll.id })

    const result = await getPollParticipation({
      userId: user.id,
      pollIdOrSlug: poll.id,
    })

    expect(result?.id).toBe(simulation.id)
  })

  it('resolves the poll by slug', async () => {
    const [user, organisation] = await Promise.all([
      userFactory.create(),
      organisationFactory.create(),
    ])
    const poll = await pollFactory.withOrganisation(organisation.id).create()
    const simulation = await simulationFactory
      .withModelRegion('FR')
      .withProgression(0.5)
      .params({ userId: user.id, computedResults: validComputedResults })
      .create()
    await attachToPoll({ simulationId: simulation.id, pollId: poll.id })

    const result = await getPollParticipation({
      userId: user.id,
      pollIdOrSlug: poll.slug,
    })

    expect(result?.id).toBe(simulation.id)
  })

  it('does not return a simulation attached to another poll', async () => {
    const [user, organisation] = await Promise.all([
      userFactory.create(),
      organisationFactory.create(),
    ])
    const [poll, otherPoll] = await Promise.all([
      pollFactory.withOrganisation(organisation.id).create(),
      pollFactory.withOrganisation(organisation.id).create(),
    ])
    const simulation = await simulationFactory
      .withProgression(0.5)
      .params({ userId: user.id, computedResults: validComputedResults })
      .create()
    await attachToPoll({ simulationId: simulation.id, pollId: otherPoll.id })

    const result = await getPollParticipation({
      userId: user.id,
      pollIdOrSlug: poll.id,
    })

    expect(result).toBeNull()
  })

  it('does not return another user simulation', async () => {
    const [user, other, organisation] = await Promise.all([
      userFactory.create(),
      userFactory.create(),
      organisationFactory.create(),
    ])
    const poll = await pollFactory.withOrganisation(organisation.id).create()
    const simulation = await simulationFactory
      .withProgression(0.5)
      .params({ userId: other.id, computedResults: validComputedResults })
      .create()
    await attachToPoll({ simulationId: simulation.id, pollId: poll.id })

    const result = await getPollParticipation({
      userId: user.id,
      pollIdOrSlug: poll.id,
    })

    expect(result).toBeNull()
  })

  it('returns the latest simulation attached to the poll, ordered by date', async () => {
    const [user, organisation] = await Promise.all([
      userFactory.create(),
      organisationFactory.create(),
    ])
    const poll = await pollFactory.withOrganisation(organisation.id).create()
    const [older, latest] = await Promise.all([
      simulationFactory
        .withModelRegion('FR')
        .withProgression(0.2)
        .params({
          userId: user.id,
          date: new Date('2024-01-01'),
          computedResults: validComputedResults,
        })
        .create(),
      simulationFactory
        .withModelRegion('FR')
        .withProgression(0.5)
        .params({
          userId: user.id,
          date: new Date('2024-02-01'),
          computedResults: validComputedResults,
        })
        .create(),
    ])
    await Promise.all([
      attachToPoll({ simulationId: older.id, pollId: poll.id }),
      attachToPoll({ simulationId: latest.id, pollId: poll.id }),
    ])

    const result = await getPollParticipation({
      userId: user.id,
      pollIdOrSlug: poll.id,
    })

    expect(result?.id).toBe(latest.id)
  })

  it('delegates migration to migrateSimulationIfNeeded', async () => {
    const { migrateSimulationIfNeeded } =
      await import('../../helpers/migrate-simulation.ts')
    const [user, organisation] = await Promise.all([
      userFactory.create(),
      organisationFactory.create(),
    ])
    const poll = await pollFactory.withOrganisation(organisation.id).create()
    const simulation = await simulationFactory
      .withModelRegion('FR')
      .withProgression(0.5)
      .params({ userId: user.id, computedResults: validComputedResults })
      .create()
    await attachToPoll({ simulationId: simulation.id, pollId: poll.id })

    await getPollParticipation({ userId: user.id, pollIdOrSlug: poll.id })

    expect(migrateSimulationIfNeeded).toHaveBeenCalledTimes(1)
    expect(migrateSimulationIfNeeded).toHaveBeenCalledWith(
      expect.objectContaining({ id: simulation.id, userId: user.id })
    )
  })
})

const validComputedResults = {
  carbone: {
    bilan: 1000,
    categories: {
      alimentation: 300,
      transport: 400,
      logement: 200,
      divers: 50,
      'services sociétaux': 50,
    },
    subcategories: {},
  },
  eau: {
    bilan: 500,
    categories: {
      alimentation: 150,
      transport: 200,
      logement: 100,
      divers: 25,
      'services sociétaux': 25,
    },
    subcategories: {},
  },
} satisfies ComputedResults

const attachToPoll = async ({
  simulationId,
  pollId,
}: {
  simulationId: string
  pollId: string
}) => {
  await prisma.simulationPoll.create({ data: { simulationId, pollId } })
}
