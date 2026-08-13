'use server'

import { GROUP_RESULTS_ROUTE_PATTERN } from '@/constants/urls/paths'
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
  revalidatePath(GROUP_RESULTS_ROUTE_PATTERN, 'page')
}
