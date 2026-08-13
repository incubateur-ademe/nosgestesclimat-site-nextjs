'use server'

import { GROUP_RESULTS_ROUTE_PATTERN } from '@/constants/urls/paths'
import { removeParticipant } from '@/services/groups/remove-participant'
import { revalidatePath } from 'next/cache'

export const removeParticipantAction = async ({
  groupId,
  participantId,
}: {
  groupId: string
  participantId: string
}) => {
  await removeParticipant({ groupId, participantId })
  revalidatePath(GROUP_RESULTS_ROUTE_PATTERN, 'page')
}
