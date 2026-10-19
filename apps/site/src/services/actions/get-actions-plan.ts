import type { Locale } from '@/i18nConfig'
import { getActionsPlan as _getActionsPlan } from '@nosgestesclimat/core/features/actions/services/get-actions-plan.service'
import { cacheLife, cacheTag } from 'next/cache'
import { unauthorized } from 'next/navigation'
import { getUserSession } from '../auth/get-user-session'
import {
  getPersonalizedActionCacheTag,
  getPersonalizedActionsPlanCacheTag,
} from './cache-tags'

export async function getActionsPlan(locale: Locale) {
  const session = await getUserSession()
  if (!session) unauthorized()

  return await getCachedActionsPlan(session.id, locale)
}

// The session is read outside of the cached function (dynamic data sources
// cannot be accessed inside "use cache") and passed in as an argument: the
// cache key is derived from the user id and locale.
async function getCachedActionsPlan(userId: string, locale: Locale) {
  'use cache'
  cacheLife('minutes')

  const actionsPlan = await _getActionsPlan(userId, locale)

  // Tag the entry with a per-user plan tag: committing to a new action must
  // revalidate the plan even though the cached plan doesn't list it yet (or
  // the user has no plan yet).
  cacheTag(getPersonalizedActionsPlanCacheTag(userId))

  // The plan only lists committed actions: tagging each of them revalidates
  // the cache entry of every locale when one of them is abandoned.
  actionsPlan?.themes.forEach((theme) =>
    theme.actions.forEach((action) =>
      cacheTag(getPersonalizedActionCacheTag(userId, action.id))
    )
  )

  return actionsPlan
}
