'use server'

import { updateGroup } from '@/services/groups/update-group'
import { revalidatePath } from 'next/cache'

export const updateGroupAction = async ({
  groupId,
  name,
}: {
  groupId: string
  name: string
}) => {
  await updateGroup({ groupId, name })
  revalidatePath('/amis/resultats')
}
