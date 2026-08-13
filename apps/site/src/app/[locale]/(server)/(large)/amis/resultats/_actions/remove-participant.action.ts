'use server'

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
  revalidatePath('/amis/resultats')
}
