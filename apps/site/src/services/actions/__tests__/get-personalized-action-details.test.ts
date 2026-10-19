import { faker } from '@faker-js/faker/locale/th'
import { afterEach, describe, expect, vi } from 'vitest'
import { getPersonalizedActionCacheTag } from '../cache-tags'
import { getPersonalizedActionDetails } from '../get-personalized-action-details'

const {
  getPersonalizedActionDetails: getPersonalizedActionDetailsCoreServiceMock,
} = vi.hoisted(() => ({
  getPersonalizedActionDetails: vi.fn(),
}))
vi.mock(
  '@nosgestesclimat/core/features/actions/services/get-personalized-action-details.service',
  () => ({
    getPersonalizedActionDetails: getPersonalizedActionDetailsCoreServiceMock,
  })
)

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

describe('getPersonalizedActionDetails service', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it('returns the action details of the session user', async () => {
    sessionMock.getUserSession.mockResolvedValue(mockUser)
    const actionDetails = {
      action: { id: faker.string.uuid() },
      otherThemeActions: [],
    }
    getPersonalizedActionDetailsCoreServiceMock.mockResolvedValue(actionDetails)

    const result = await getPersonalizedActionDetails('some-slug', 'fr')

    expect(result).toBe(actionDetails)
    expect(getPersonalizedActionDetailsCoreServiceMock).toHaveBeenCalledWith(
      'some-slug',
      'fr',
      mockUser.id
    )
    expect(cacheLifeMock).toHaveBeenCalledWith('minutes')
  })

  it('tags the cache with the user id and the id of the returned action', async () => {
    sessionMock.getUserSession.mockResolvedValue(mockUser)
    const actionId = faker.string.uuid()
    getPersonalizedActionDetailsCoreServiceMock.mockResolvedValue({
      action: { id: actionId },
      otherThemeActions: [],
    })

    await getPersonalizedActionDetails('some-slug', 'fr')

    expect(cacheTagMock).toHaveBeenCalledTimes(1)
    expect(cacheTagMock).toHaveBeenCalledWith(
      getPersonalizedActionCacheTag(mockUser.id, actionId)
    )
    expect(cacheTagMock).toHaveBeenCalledWith(
      `user:${mockUser.id}::action:${actionId}`
    )
  })

  it('loads non-personalized details and does not tag the cache when there is no session', async () => {
    sessionMock.getUserSession.mockResolvedValue(null)
    const actionDetails = {
      action: { id: faker.string.uuid() },
      otherThemeActions: [],
    }
    getPersonalizedActionDetailsCoreServiceMock.mockResolvedValue(actionDetails)

    const result = await getPersonalizedActionDetails('some-slug', 'fr')

    expect(result).toBe(actionDetails)
    expect(getPersonalizedActionDetailsCoreServiceMock).toHaveBeenCalledWith(
      'some-slug',
      'fr',
      undefined
    )
    expect(cacheTagMock).not.toHaveBeenCalled()
  })

  it('does not tag the cache when the action is not found', async () => {
    sessionMock.getUserSession.mockResolvedValue(mockUser)
    getPersonalizedActionDetailsCoreServiceMock.mockResolvedValue(null)

    const result = await getPersonalizedActionDetails('unknown-slug', 'fr')

    expect(result).toBeNull()
    expect(cacheTagMock).not.toHaveBeenCalled()
  })
})
