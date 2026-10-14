import { faker } from '@faker-js/faker/locale/th'
import { afterEach, describe, vi } from 'vitest'
import { getPersonalizedActionCacheTag } from '../cache-tags'
import { getPersonalizedActionsCatalogue } from '../get-personalized-actions-catalogue'

const {
  getPersonalizedActionsCatalogue:
    getPersonalizedActionsCatalogueCoreServiceMock,
} = vi.hoisted(() => ({
  getPersonalizedActionsCatalogue: vi.fn(),
}))
vi.mock(
  '@nosgestesclimat/core/features/actions/services/get-personalized-actions-catalogue.service',
  () => ({
    getPersonalizedActionsCatalogue:
      getPersonalizedActionsCatalogueCoreServiceMock,
  })
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

describe('getPersonalizedActionsCatalogue service', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should call unauthorized() if no user session is found', async () => {
    sessionMock.getUserSession.mockResolvedValue(null)

    await expect(getPersonalizedActionsCatalogue('fr')).rejects.toThrow(
      'NEXT_UNAUTHORIZED'
    )

    expect(unauthorizedMock).toHaveBeenCalledTimes(1)
    expect(
      getPersonalizedActionsCatalogueCoreServiceMock
    ).not.toHaveBeenCalled()
    expect(cacheTagMock).not.toHaveBeenCalled()
  })

  it('should load the catalogue of the session user and tag the cache with each action', async () => {
    sessionMock.getUserSession.mockResolvedValue(mockUser)
    const actionIds = [faker.string.uuid(), faker.string.uuid()]
    const catalogue = {
      assessmentStatus: 'completed',
      actions: actionIds.map((id) => ({ id })),
      topActions: [{ id: actionIds[0] }],
      plan: null,
    }
    getPersonalizedActionsCatalogueCoreServiceMock.mockResolvedValue(catalogue)

    const result = await getPersonalizedActionsCatalogue('fr')

    expect(result).toBe(catalogue)
    expect(getPersonalizedActionsCatalogueCoreServiceMock).toHaveBeenCalledWith(
      mockUser.id,
      'fr'
    )
    expect(cacheLifeMock).toHaveBeenCalledWith('minutes')
    expect(cacheTagMock).toHaveBeenCalledTimes(actionIds.length)
    actionIds.forEach((actionId) =>
      expect(cacheTagMock).toHaveBeenCalledWith(
        getPersonalizedActionCacheTag(mockUser.id, actionId)
      )
    )
  })

  it('should load the catalogue of an anonymous session user', async () => {
    const unverifiedUser = { id: faker.string.uuid(), isAuth: false }
    sessionMock.getUserSession.mockResolvedValue(unverifiedUser)
    getPersonalizedActionsCatalogueCoreServiceMock.mockResolvedValue({
      assessmentStatus: null,
      actions: [],
      topActions: [],
      plan: null,
    })

    await getPersonalizedActionsCatalogue('en')

    expect(getPersonalizedActionsCatalogueCoreServiceMock).toHaveBeenCalledWith(
      unverifiedUser.id,
      'en'
    )
  })
})
