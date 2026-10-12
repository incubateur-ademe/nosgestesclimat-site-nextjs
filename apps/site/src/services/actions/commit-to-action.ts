'use server'

import { commitToAction as _commitToAction } from '@nosgestesclimat/core/features/actions/services/commit-to-action.service'
import { updateTag } from 'next/cache'
import { unauthorized } from 'next/navigation'
import { getUserSession } from '../auth/get-user-session'
import { getActionsPlanCacheTagWithUserId } from './get-actions-plan'
import { getPersonalizedActionDetailsCacheTagWithId } from './get-personalized-action-details'
import { GET_PERSONALIZED_ACTIONS_CACHE_TAG } from './get-personalized-actions-catalogue'

export async function commitToAction(actionId: string) {
  const session = await getUserSession()
  if (!session) unauthorized()

  await _commitToAction({
    actionId,
    userId: session.id,
  })

  // Reset actions list, action plan AND specific action cache to avoid
  // missmatch between pages
  updateTag(GET_PERSONALIZED_ACTIONS_CACHE_TAG)
  updateTag(getActionsPlanCacheTagWithUserId(session.id))
  updateTag(getPersonalizedActionDetailsCacheTagWithId(actionId))
}
