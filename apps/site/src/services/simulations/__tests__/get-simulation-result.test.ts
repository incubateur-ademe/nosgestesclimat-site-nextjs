import { simulationFactory } from '@nosgestesclimat/core/features/simulations/factories/simulation.factory'
import type { SimulationResult } from '@nosgestesclimat/core/features/simulations/services/get-simulation-result.service'
import { v4 as randomUUID } from 'uuid'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getUserSession } from '@/services/auth/get-user-session'
import { getSimulationResult } from '../get-simulation-result'

const serviceMock = vi.hoisted(() => ({
  getSimulationResultService: vi.fn(),
}))

const notFoundMock = vi.hoisted(() => vi.fn())

vi.mock('@/services/auth/get-user-session', () => ({
  getUserSession: vi.fn(),
}))

vi.mock(
  '@nosgestesclimat/core/features/simulations/services/get-simulation-result.service',
  () => ({
    getSimulationResult: serviceMock.getSimulationResultService,
  })
)

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

    await expect(
      getSimulationResult({ by: 'id', id: randomUUID() })
    ).rejects.toThrow('NEXT_NOT_FOUND')
    expect(serviceMock.getSimulationResultService).not.toHaveBeenCalled()
  })

  it('returns null when the core service returns null', async () => {
    const userId = randomUUID()
    const simulationId = randomUUID()
    vi.mocked(getUserSession).mockResolvedValue({
      id: userId,
      email: 'alice@example.com',
      isAuth: true,
    })
    serviceMock.getSimulationResultService.mockResolvedValue(null)

    const result = await getSimulationResult({ by: 'id', id: simulationId })

    expect(result).toBeNull()
    expect(serviceMock.getSimulationResultService).toHaveBeenCalledWith({
      by: 'id',
      id: simulationId,
      userId,
    })
  })

  it('returns SimulationResult with null group when simulation has no groups or polls', async () => {
    const userId = randomUUID()
    vi.mocked(getUserSession).mockResolvedValue({
      id: userId,
      email: 'alice@example.com',
      isAuth: true,
    })

    const entity = simulationFactory.withModelRegion('FR').build()
    const coreResult: SimulationResult = {
      type: 'result',
      simulation: entity,
      previousSimulation: null,
      group: null,
      tendency: null,
    }
    serviceMock.getSimulationResultService.mockResolvedValue(coreResult)

    const result = await getSimulationResult({ by: 'id', id: entity.id })

    expect(result).not.toBeNull()
    expect(result!.group).toBeNull()
    expect(result!.tendency).toBeNull()
    expect(result!.previousSimulation).toBeNull()
    expect(result!.simulation.computedResults).toEqual(entity.computedResults)
  })

  it('returns group info with type "group" when simulation has a group', async () => {
    const userId = randomUUID()
    const groupId = randomUUID()
    vi.mocked(getUserSession).mockResolvedValue({
      id: userId,
      email: 'alice@example.com',
      isAuth: true,
    })

    const entity = simulationFactory.withModelRegion('FR').build()
    const coreResult: SimulationResult = {
      type: 'result',
      simulation: entity,
      previousSimulation: null,
      group: { type: 'group', value: { id: groupId, name: 'My Group' } },
      tendency: null,
    }
    serviceMock.getSimulationResultService.mockResolvedValue(coreResult)

    const result = await getSimulationResult({ by: 'id', id: entity.id })

    expect(result).not.toBeNull()
    expect(result!.group).toEqual({
      type: 'group',
      value: { id: groupId, name: 'My Group' },
    })
  })

  it('returns group info with type "poll" when simulation has a poll but no group', async () => {
    const userId = randomUUID()
    const pollId = randomUUID()
    vi.mocked(getUserSession).mockResolvedValue({
      id: userId,
      email: 'alice@example.com',
      isAuth: true,
    })

    const entity = simulationFactory.withModelRegion('FR').build()
    const coreResult: SimulationResult = {
      type: 'result',
      simulation: entity,
      previousSimulation: null,
      group: {
        type: 'poll',
        value: {
          id: pollId,
          name: 'My Poll',
          slug: 'my-poll',
          organisation: { slug: 'my-org' },
        },
      },
      tendency: null,
    }
    serviceMock.getSimulationResultService.mockResolvedValue(coreResult)

    const result = await getSimulationResult({ by: 'id', id: entity.id })

    expect(result).not.toBeNull()
    expect(result!.group).toEqual({
      type: 'poll',
      value: {
        id: pollId,
        name: 'My Poll',
        slug: 'my-poll',
        organisation: { slug: 'my-org' },
      },
    })
  })

  it('returns tendency result with previousSimulation', async () => {
    const userId = randomUUID()
    vi.mocked(getUserSession).mockResolvedValue({
      id: userId,
      email: 'alice@example.com',
      isAuth: true,
    })

    const entity = simulationFactory.withModelRegion('FR').build()
    entity.computedResults.carbone.bilan = 800
    const previousEntity = simulationFactory.withModelRegion('FR').build()
    previousEntity.computedResults.carbone.bilan = 1000

    const coreResult: SimulationResult = {
      type: 'tendency',
      simulation: entity,
      previousSimulation: previousEntity,
      group: null,
      tendency: 'decrease',
    }
    serviceMock.getSimulationResultService.mockResolvedValue(coreResult)

    const result = await getSimulationResult({
      by: 'latest',
      withTendency: true,
    })

    expect(result).not.toBeNull()
    expect(result!.type).toBe('tendency')
    expect(result!.tendency).toBe('decrease')
    expect(result!.previousSimulation).not.toBeNull()
    expect(serviceMock.getSimulationResultService).toHaveBeenCalledWith({
      by: 'latest',
      withTendency: true,
      userId,
    })
  })
})
