import type { Locale } from '@/i18nConfig'
import { getPersonalizedActionDetails as _getPersonalizedActionDetails } from '@nosgestesclimat/core/features/actions/services/get-personalized-action-details.service'
import { cacheLife, cacheTag } from 'next/cache'
import { getUserSession } from '../auth/get-user-session'
import { getPersonalizedActionCacheTag } from './cache-tags'

// The action page is public: without a session, the details are not
// personalized and share a single cache entry per slug and locale.
export async function getPersonalizedActionDetails(
  slug: string,
  locale: Locale
) {
  const session = await getUserSession()

  return await getCachedPersonalizedActionDetails(slug, locale, session?.id)
}

// The session is read outside of the cached function (dynamic data sources
// cannot be accessed inside "use cache") and passed in as an argument: the
// cache key is derived from the slug, locale and user id.
async function getCachedPersonalizedActionDetails(
  slug: string,
  locale: Locale,
  userId: string | undefined
) {
  'use cache'
  cacheLife('minutes')

  const actionDetails = await _getPersonalizedActionDetails(
    slug,
    locale,
    userId
  )

  // The action id is only known once the action is loaded: tagging by id
  // rather than by the locale-specific slug revalidates the cache entry of
  // every locale when the action is committed to or abandoned. Tagging by
  // user id scopes that revalidation to the entry of the user who committed
  // or abandoned it. Without a session the user cannot commit, so the
  // shared entry never needs to be revalidated.
  if (actionDetails && userId) {
    cacheTag(getPersonalizedActionCacheTag(userId, actionDetails.action.id))
  }

  return actionDetails
}
