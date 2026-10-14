'use server'

import { commitToAction as _commitToAction } from '@nosgestesclimat/core/features/actions/services/commit-to-action.service'
import { updateTag } from 'next/cache'
import { unauthorized } from 'next/navigation'
import { getUserSession } from '../auth/get-user-session'
import {
  getPersonalizedActionCacheTag,
  getPersonalizedActionsPlanCacheTag,
} from './cache-tags'

export async function commitToAction(actionId: string) {
  const session = await getUserSession()
  if (!session) unauthorized()

  await _commitToAction({
    actionId,
    userId: session.id,
  })

  // Reset the caches of the current user listing this action (catalogue,
  // plan, action details) to avoid mismatch between pages
  updateTag(getPersonalizedActionCacheTag(session.id, actionId))
  // The cached plan doesn't list the newly committed action yet: reset it
  // too so that the plan page shows the new action immediately
  updateTag(getPersonalizedActionsPlanCacheTag(session.id))
}
