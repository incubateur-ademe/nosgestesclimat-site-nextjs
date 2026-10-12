import type { Locale } from '@/i18nConfig'
import { getActionsPlan as _getActionsPlan } from '@nosgestesclimat/core/features/actions/services/get-actions-plan.service'
import { cacheLife, cacheTag } from 'next/cache'
import { unauthorized } from 'next/navigation'
import { getUserSession } from '../auth/get-user-session'

export const GET_ACTIONS_PLAN_CACHE_TAG_PREFIX = 'get_actions_plan'

// Tagging by user id scopes revalidation to the plan of a single user, across
// every locale.
export const getActionsPlanCacheTagWithUserId = (userId: string) =>
  `${GET_ACTIONS_PLAN_CACHE_TAG_PREFIX}-${userId}`

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
  cacheTag(getActionsPlanCacheTagWithUserId(userId))

  return await _getActionsPlan(userId, locale)
}
