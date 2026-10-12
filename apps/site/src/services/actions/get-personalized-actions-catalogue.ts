import type { Locale } from '@/i18nConfig'
import { getPersonalizedActionsCatalogue as _getPersonalizedActionsCatalogue } from '@nosgestesclimat/core/features/actions/services/get-personalized-actions-catalogue.service'
import { cacheLife, cacheTag } from 'next/cache'
import { unauthorized } from 'next/navigation'
import { getUserSession } from '../auth/get-user-session'

export const GET_PERSONALIZED_ACTIONS_CACHE_TAG_PREFIX =
  'get_personalized_actions'

// Tagging by user id scopes revalidation to the catalogue of a single user,
// across every locale.
export const getPersonalizedActionsCacheTagWithUserId = (userId: string) =>
  `${GET_PERSONALIZED_ACTIONS_CACHE_TAG_PREFIX}-${userId}`

export async function getPersonalizedActionsCatalogue(locale: Locale) {
  const session = await getUserSession()
  if (!session) unauthorized()

  return await getCachedPersonalizedActionsCatalogue(session.id, locale)
}

// The session is read outside of the cached function (dynamic data sources
// cannot be accessed inside "use cache") and passed in as an argument: the
// cache key is derived from the user id and locale.
async function getCachedPersonalizedActionsCatalogue(
  userId: string,
  locale: Locale
) {
  'use cache'
  cacheLife('minutes')
  cacheTag(getPersonalizedActionsCacheTagWithUserId(userId))

  return await _getPersonalizedActionsCatalogue(userId, locale)
}
