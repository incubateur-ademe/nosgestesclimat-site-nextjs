'use server'

import { commitToAction as _commitToAction } from '@nosgestesclimat/core/features/actions/services/commit-to-action.service'
import { updateTag } from 'next/cache'
import { unauthorized } from 'next/navigation'
import { getUserSession } from '../auth/get-user-session'
import { getActionsPlanCacheTagWithUserId } from './get-actions-plan'
import { getPersonalizedActionDetailsCacheTagWithIds } from './get-personalized-action-details'
import { getPersonalizedActionsCacheTagWithUserId } from './get-personalized-actions-catalogue'

export async function commitToAction(actionId: string) {
  const session = await getUserSession()
  if (!session) unauthorized()

  await _commitToAction({
    actionId,
    userId: session.id,
  })

  // Reset actions list, action plan AND specific action cache to avoid
  // missmatch between pages, for the current user only
  updateTag(getPersonalizedActionsCacheTagWithUserId(session.id))
  updateTag(getActionsPlanCacheTagWithUserId(session.id))
  updateTag(
    getPersonalizedActionDetailsCacheTagWithIds({
      userId: session.id,
      actionId,
    })
  )
}
