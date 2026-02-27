'use server'

import { GROUP_URL } from '@/constants/urls/main'
import type { Group } from '@/types/groups'
import { captureException } from '@sentry/nextjs'
import { fetchServer } from './fetchServer'
import { getAuthUserOrNull } from './user'

export async function getUserGroups(): Promise<Group[]> {
  const user = await getAuthUserOrNull()

  if (!user) {
    return []
  }

  try {
    return await fetchServer<Group[]>(`${GROUP_URL}/${user.id}`)
  } catch (error) {
    captureException(error)
    return []
  }
}

export async function fetchGroupById({
  groupId,
  userId,
}: {
  groupId: string
  userId: string
}): Promise<Group | null> {
  try {
    return await fetchServer<Group>(`${GROUP_URL}/${userId}/${groupId}`)
  } catch (error) {
    captureException(error)
    return null
  }
}
