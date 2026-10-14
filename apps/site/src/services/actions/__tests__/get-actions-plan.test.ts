import { faker } from '@faker-js/faker/locale/th'
import { afterEach, describe, vi } from 'vitest'
import {
  getPersonalizedActionCacheTag,
  getPersonalizedActionsPlanCacheTag,
} from '../cache-tags'
import { getActionsPlan } from '../get-actions-plan'

const { getActionsPlan: getActionsPlanCoreServiceMock } = vi.hoisted(() => ({
  getActionsPlan: vi.fn(),
}))
vi.mock(
  '@nosgestesclimat/core/features/actions/services/get-actions-plan.service',
  () => ({ getActionsPlan: getActionsPlanCoreServiceMock })
)

const { unauthorized: unauthorizedMock } = vi.hoisted(() => ({
  unauthorized: vi.fn(() => {
    throw new Error('NEXT_UNAUTHORIZED')
  }),
}))
vi.mock('next/navigation', () => ({ unauthorized: unauthorizedMock }))

const sessionMock = vi.hoisted(() => ({
  getUserSession: vi.fn(),
}))
vi.mock('../../auth/get-user-session', () => ({
  getUserSession: sessionMock.getUserSession,
}))

const { cacheLife: cacheLifeMock, cacheTag: cacheTagMock } = vi.hoisted(() => ({
  cacheLife: vi.fn(),
  cacheTag: vi.fn(),
}))
vi.mock('next/cache', () => ({
  cacheLife: cacheLifeMock,
  cacheTag: cacheTagMock,
}))

const mockUser = {
  id: faker.string.uuid(),
  email: faker.internet.email(),
  isAuth: true,
}

describe('getActionsPlan service', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should call unauthorized() if no user session is found', async () => {
    sessionMock.getUserSession.mockResolvedValue(null)

    await expect(getActionsPlan('fr')).rejects.toThrow('NEXT_UNAUTHORIZED')

    expect(unauthorizedMock).toHaveBeenCalledTimes(1)
    expect(getActionsPlanCoreServiceMock).not.toHaveBeenCalled()
    expect(cacheTagMock).not.toHaveBeenCalled()
  })

  it('should load the plan of the session user and tag the cache with each committed action', async () => {
    sessionMock.getUserSession.mockResolvedValue(mockUser)
    const actionIds = [faker.string.uuid(), faker.string.uuid()]
    const actionsPlan = {
      plan: { numberOfCommittedActions: 2, totalImpact: 1000 },
      themes: [
        {
          id: faker.string.uuid(),
          key: 'transport',
          title: 'Transport',
          actions: actionIds.map((id) => ({ id })),
        },
      ],
    }
    getActionsPlanCoreServiceMock.mockResolvedValue(actionsPlan)

    const result = await getActionsPlan('fr')

    expect(result).toBe(actionsPlan)
    expect(getActionsPlanCoreServiceMock).toHaveBeenCalledWith(
      mockUser.id,
      'fr'
    )
    expect(cacheLifeMock).toHaveBeenCalledWith('minutes')
    expect(cacheTagMock).toHaveBeenCalledTimes(actionIds.length + 1)
    expect(cacheTagMock).toHaveBeenCalledWith(
      getPersonalizedActionsPlanCacheTag(mockUser.id)
    )
    actionIds.forEach((actionId) =>
      expect(cacheTagMock).toHaveBeenCalledWith(
        getPersonalizedActionCacheTag(mockUser.id, actionId)
      )
    )
  })

  it('should load the plan of an anonymous session user', async () => {
    const anonUser = { id: faker.string.uuid(), isAuth: false }
    sessionMock.getUserSession.mockResolvedValue(anonUser)
    getActionsPlanCoreServiceMock.mockResolvedValue(null)

    await getActionsPlan('en')

    expect(getActionsPlanCoreServiceMock).toHaveBeenCalledWith(
      anonUser.id,
      'en'
    )
    // The plan tag is set even without a plan so that committing to a first
    // action revalidates the cached null plan
    expect(cacheTagMock).toHaveBeenCalledTimes(1)
    expect(cacheTagMock).toHaveBeenCalledWith(
      getPersonalizedActionsPlanCacheTag(anonUser.id)
    )
  })
})
