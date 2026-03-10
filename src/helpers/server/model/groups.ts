'use server'

import { GROUP_URL } from '@/constants/urls/main'
import type { Group } from '@/types/groups'
import { fetchServer } from './fetchServer'
import { getAuthUser } from './user'

export async function getUserGroups(): Promise<Group[]> {
  const user = await getAuthUser()

  return await fetchServer<Group[]>(`${GROUP_URL}/${user.id}`)
}

export async function getGroupById({
  groupId,
  userId,
}: {
  groupId: string
  userId: string
}): Promise<Group | null> {
  return await fetchServer<Group>(`${GROUP_URL}/${userId}/${groupId}`)
}
