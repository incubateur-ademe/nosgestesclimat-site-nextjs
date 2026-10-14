import type { Locale } from '@/i18nConfig'
import { getPersonalizedActionsCatalogue as _getPersonalizedActionsCatalogue } from '@nosgestesclimat/core/features/actions/services/get-personalized-actions-catalogue.service'
import { cacheLife, cacheTag } from 'next/cache'
import { unauthorized } from 'next/navigation'
import { getUserSession } from '../auth/get-user-session'
import { getPersonalizedActionCacheTag } from './cache-tags'

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

  const catalogue = await _getPersonalizedActionsCatalogue(userId, locale)

  // The catalogue lists the actions: tagging each of them revalidates the
  // cache entry of every locale when one of them is committed to or
  // abandoned. topActions is a subset of actions, so it needs no extra tag.
  catalogue.actions.forEach((action) =>
    cacheTag(getPersonalizedActionCacheTag(userId, action.id))
  )

  return catalogue
}
