'use server'

import { abandonActionCommitment as _abandonActionCommitment } from '@nosgestesclimat/core/features/actions/services/abandon-action-commitment.service'
import { updateTag } from 'next/cache'
import { unauthorized } from 'next/navigation'
import { getUserSession } from '../auth/get-user-session'
import { getPersonalizedActionCacheTag } from './cache-tags'

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

  // Reset the caches of the current user listing this action (catalogue,
  // plan, action details) to avoid mismatch between pages
  updateTag(getPersonalizedActionCacheTag(session.id, actionId))
}
