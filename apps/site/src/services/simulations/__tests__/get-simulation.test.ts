import { simulationFactory } from '@nosgestesclimat/core/features/simulations/factories/simulation.factory'
import { serializeModel } from '@nosgestesclimat/core/features/simulations/repository/model.mapper'
import { v4 as randomUUID } from 'uuid'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getUserSession } from '@/services/auth/get-user-session'
import { mockAuthenticatedSession } from '../../../helpers/tests/mockAuthenticatedSession'
import { getSimulation } from '../get-simulation'

const serviceMock = vi.hoisted(() => ({
  getSimulation: vi.fn(),
}))

const navigationMock = vi.hoisted(() => ({
  notFound: vi.fn(() => {
    throw new Error('NEXT_NOT_FOUND')
  }),
  unauthorized: vi.fn(() => {
    throw new Error('NEXT_UNAUTHORIZED')
  }),
}))

vi.mock('next/navigation', () => ({
  notFound: navigationMock.notFound,
  unauthorized: navigationMock.unauthorized,
}))

vi.mock('@/services/auth/get-user-session', () => ({
  getUserSession: vi.fn(),
}))

vi.mock(
  '@nosgestesclimat/core/features/simulations/services/get-simulation.service',
  () => ({
    getSimulation: serviceMock.getSimulation,
  })
)

describe('getSimulation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls unauthorized when there is no session', async () => {
    vi.mocked(getUserSession).mockResolvedValue(null)

    await expect(getSimulation(randomUUID())).rejects.toThrow(
      'NEXT_UNAUTHORIZED'
    )
    expect(navigationMock.unauthorized).toHaveBeenCalled()
    expect(serviceMock.getSimulation).not.toHaveBeenCalled()
  })

  it('calls notFound when the core service returns null', async () => {
    const userId = mockAuthenticatedSession()
    const simulationId = randomUUID()
    serviceMock.getSimulation.mockResolvedValue(null)

    await expect(getSimulation(simulationId)).rejects.toThrow('NEXT_NOT_FOUND')
    expect(navigationMock.notFound).toHaveBeenCalled()
    expect(serviceMock.getSimulation).toHaveBeenCalledWith({
      id: simulationId,
      userId,
    })
  })

  it('maps the entity to a DTO', async () => {
    const userId = mockAuthenticatedSession()
    const simulationId = randomUUID()

    const entity = simulationFactory.withModelRegion('FR').build()
    entity.id = simulationId
    serviceMock.getSimulation.mockResolvedValue(entity)

    const result = await getSimulation(simulationId)

    expect(serviceMock.getSimulation).toHaveBeenCalledWith({
      id: simulationId,
      userId,
    })
    expect(result).toEqual({
      id: entity.id,
      date: entity.date.toISOString(),
      situation: entity.situation,
      foldedSteps: entity.foldedSteps,
      computedResults: entity.computedResults,
      progression: entity.progression,
      model: serializeModel(entity.model),
      updatedAt: entity.updatedAt.toISOString(),
    })
  })
})
