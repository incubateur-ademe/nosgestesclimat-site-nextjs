'use server'

import { abandonActionCommitment as _abandonActionCommitment } from '@nosgestesclimat/core/features/actions/services/abandon-action-commitment.service'
import { updateTag } from 'next/cache'
import { unauthorized } from 'next/navigation'
import { getUserSession } from '../auth/get-user-session'
import { getActionsPlanCacheTagWithUserId } from './get-actions-plan'
import { getPersonalizedActionDetailsCacheTagWithId } from './get-personalized-action-details'
import { GET_PERSONALIZED_ACTIONS_CACHE_TAG } from './get-personalized-actions-catalogue'

interface Props {
  actionId: string
}

export async function abandonActionCommitment({ actionId }: Props) {
  const session = await getUserSession()
  if (!session) unauthorized()

  await _abandonActionCommitment({
    actionId,
    userId: session.id,
  })

  // Reset actions list, action plan AND specific action cache to avoid
  // missmatch between pages
  updateTag(GET_PERSONALIZED_ACTIONS_CACHE_TAG)
  updateTag(getActionsPlanCacheTagWithUserId(session.id))
  updateTag(getPersonalizedActionDetailsCacheTagWithId(actionId))
}
