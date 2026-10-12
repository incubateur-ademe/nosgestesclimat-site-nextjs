'use server'

import { abandonActionCommitment as _abandonActionCommitment } from '@nosgestesclimat/core/features/actions/services/abandon-action-commitment.service'
import { updateTag } from 'next/cache'
import { unauthorized } from 'next/navigation'
import { getUserSession } from '../auth/get-user-session'
import { getActionsPlanCacheTagWithUserId } from './get-actions-plan'
import { getPersonalizedActionDetailsCacheTagWithIds } from './get-personalized-action-details'
import { getPersonalizedActionsCacheTagWithUserId } from './get-personalized-actions-catalogue'

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
