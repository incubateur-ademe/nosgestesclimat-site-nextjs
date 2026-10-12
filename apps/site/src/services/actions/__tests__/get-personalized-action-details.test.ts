import { faker } from '@faker-js/faker/locale/th'
import { afterEach, describe, expect, vi } from 'vitest'
import {
  GET_PERSONALIZED_ACTION_DETAILS_CACHE_TAG_PREFIX,
  getPersonalizedActionDetails,
  getPersonalizedActionDetailsCacheTagWithId,
} from '../get-personalized-action-details'

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

const { cacheLife: cacheLifeMock, cacheTag: cacheTagMock } = vi.hoisted(() => ({
  cacheLife: vi.fn(),
  cacheTag: vi.fn(),
}))
vi.mock('next/cache', () => ({
  cacheLife: cacheLifeMock,
  cacheTag: cacheTagMock,
}))

describe('getPersonalizedActionDetails service', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it('returns the action details of the core service', async () => {
    const actionDetails = {
      action: { id: faker.string.uuid() },
      otherThemeActions: [],
    }
    getPersonalizedActionDetailsCoreServiceMock.mockResolvedValue(actionDetails)

    const result = await getPersonalizedActionDetails(
      'some-slug',
      'fr',
      faker.string.uuid()
    )

    expect(result).toBe(actionDetails)
    expect(cacheLifeMock).toHaveBeenCalledWith('minutes')
  })

  it('tags the cache with the id of the returned action, not the requested slug', async () => {
    const actionId = faker.string.uuid()
    getPersonalizedActionDetailsCoreServiceMock.mockResolvedValue({
      action: { id: actionId },
      otherThemeActions: [],
    })

    await getPersonalizedActionDetails('some-slug', 'fr', faker.string.uuid())

    expect(cacheTagMock).toHaveBeenCalledTimes(1)
    expect(cacheTagMock).toHaveBeenCalledWith(
      getPersonalizedActionDetailsCacheTagWithId(actionId)
    )
    expect(cacheTagMock).toHaveBeenCalledWith(
      `${GET_PERSONALIZED_ACTION_DETAILS_CACHE_TAG_PREFIX}-${actionId}`
    )
  })

  it('does not tag the cache when the action is not found', async () => {
    getPersonalizedActionDetailsCoreServiceMock.mockResolvedValue(null)

    const result = await getPersonalizedActionDetails(
      'unknown-slug',
      'fr',
      undefined
    )

    expect(result).toBeNull()
    expect(cacheTagMock).not.toHaveBeenCalled()
  })
})
