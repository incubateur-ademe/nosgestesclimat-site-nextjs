import { simulationFactory } from '@nosgestesclimat/core/features/simulations/factories/simulation.factory'
import { v4 as randomUUID } from 'uuid'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getUserSession } from '@/services/auth/get-user-session'
import { getSimulationResult } from '../get-simulation-result'

const serviceMock = vi.hoisted(() => ({
  getSimulation: vi.fn(),
  getPoll: vi.fn(),
  prismaGroupFindUnique: vi.fn(),
}))

const notFoundMock = vi.hoisted(() => vi.fn())

vi.mock('@/services/auth/get-user-session', () => ({
  getUserSession: vi.fn(),
}))

vi.mock(
  '@nosgestesclimat/core/features/simulations/services/get-simulation.service',
  () => ({
    getSimulation: serviceMock.getSimulation,
  })
)

vi.mock('@/services/polls/get-poll', () => ({
  getPoll: serviceMock.getPoll,
}))

vi.mock('@nosgestesclimat/core/prisma/client', () => ({
  prisma: {
    group: {
      findUnique: serviceMock.prismaGroupFindUnique,
    },
  },
}))

vi.mock('next/navigation', () => ({
  notFound: notFoundMock,
}))

describe('getSimulationResult', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    notFoundMock.mockImplementation(() => {
      throw new Error('NEXT_NOT_FOUND')
    })
  })

  it('calls notFound when there is no session', async () => {
    vi.mocked(getUserSession).mockResolvedValue(null)

    await expect(getSimulationResult(randomUUID())).rejects.toThrow(
      'NEXT_NOT_FOUND'
    )
    expect(serviceMock.getSimulation).not.toHaveBeenCalled()
  })

  it('calls notFound when the core service returns null', async () => {
    const userId = randomUUID()
    const simulationId = randomUUID()
    vi.mocked(getUserSession).mockResolvedValue({
      id: userId,
      email: 'alice@example.com',
      isAuth: true,
    })
    serviceMock.getSimulation.mockResolvedValue(null)

    await expect(getSimulationResult(simulationId)).rejects.toThrow(
      'NEXT_NOT_FOUND'
    )
    expect(serviceMock.getSimulation).toHaveBeenCalledWith({
      id: simulationId,
      userId,
    })
  })

  it('returns SimulationResult with null group when simulation has no groups or polls', async () => {
    const userId = randomUUID()
    const simulationId = randomUUID()
    vi.mocked(getUserSession).mockResolvedValue({
      id: userId,
      email: 'alice@example.com',
      isAuth: true,
    })

    const entity = simulationFactory.withModelRegion('FR').build()
    entity.id = simulationId
    serviceMock.getSimulation.mockResolvedValue(entity)

    const result = await getSimulationResult(simulationId)

    expect(result.group).toBeNull()
    expect(result.computedResults).toEqual(entity.computedResults)
    expect(serviceMock.prismaGroupFindUnique).not.toHaveBeenCalled()
    expect(serviceMock.getPoll).not.toHaveBeenCalled()
  })

  it('returns group from prisma when simulation has a group', async () => {
    const userId = randomUUID()
    const simulationId = randomUUID()
    const groupId = randomUUID()
    vi.mocked(getUserSession).mockResolvedValue({
      id: userId,
      email: 'alice@example.com',
      isAuth: true,
    })

    const entity = simulationFactory.withModelRegion('FR').build()
    entity.id = simulationId
    entity.groups = [{ id: groupId }]
    serviceMock.getSimulation.mockResolvedValue(entity)
    serviceMock.prismaGroupFindUnique.mockResolvedValue({
      id: groupId,
      name: 'My Group',
    })

    const result = await getSimulationResult(simulationId)

    expect(result.group).toEqual({
      name: 'My Group',
      href: `/amis/resultats?groupId=${groupId}`,
    })
    expect(serviceMock.prismaGroupFindUnique).toHaveBeenCalledWith({
      where: { id: groupId },
      select: { id: true, name: true },
    })
    expect(serviceMock.getPoll).not.toHaveBeenCalled()
  })

  it('returns group from poll repo when simulation has a poll but no group', async () => {
    const userId = randomUUID()
    const simulationId = randomUUID()
    const pollId = randomUUID()
    vi.mocked(getUserSession).mockResolvedValue({
      id: userId,
      email: 'alice@example.com',
      isAuth: true,
    })

    const entity = simulationFactory.withModelRegion('FR').build()
    entity.id = simulationId
    entity.polls = [{ id: pollId, slug: 'my-poll', name: 'My Poll' }]
    serviceMock.getSimulation.mockResolvedValue(entity)
    serviceMock.getPoll.mockResolvedValue({
      id: pollId,
      name: 'My Poll',
      slug: 'my-poll',
      mode: 'standard',
      expectedNumberOfParticipants: null,
      funFacts: null,
      computedResults: null,
      defaultAdditionalQuestions: [],
      customAdditionalQuestions: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      organisation: { id: 'org-id', name: 'My Org', slug: 'my-org' },
    })

    const result = await getSimulationResult(simulationId)

    expect(result.group).toEqual({
      name: 'My Poll',
      href: '/organisations/my-org/campagnes/my-poll',
    })
    expect(serviceMock.getPoll).toHaveBeenCalledWith(pollId)
    expect(serviceMock.prismaGroupFindUnique).not.toHaveBeenCalled()
  })
})
