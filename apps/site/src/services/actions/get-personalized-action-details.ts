import { getPersonalizedActionDetails as _getPersonalizedActionDetails } from '@nosgestesclimat/core/features/actions/services/get-personalized-action-details.service'
import { cacheLife, cacheTag } from 'next/cache'

export const GET_PERSONALIZED_ACTION_DETAILS_CACHE_TAG_PREFIX =
  'get_personalized_action_details'

export const getPersonalizedActionDetailsCacheTagWithId = (actionId: string) =>
  `${GET_PERSONALIZED_ACTION_DETAILS_CACHE_TAG_PREFIX}-${actionId}`

export async function getPersonalizedActionDetails(
  ...args: Parameters<typeof _getPersonalizedActionDetails>
) {
  'use cache'
  cacheLife('minutes')

  const actionDetails = await _getPersonalizedActionDetails(...args)

  // The action id is only known once the action is loaded: tagging by id
  // rather than by the locale-specific slug revalidates the cache entry of
  // every locale when the action is committed to or abandoned.
  if (actionDetails) {
    cacheTag(
      getPersonalizedActionDetailsCacheTagWithId(actionDetails.action.id)
    )
  }

  return actionDetails
}
