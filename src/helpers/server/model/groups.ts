import { GROUP_URL } from '@/constants/urls/main'
import type { Group } from '@/types/groups'
import { captureException } from '@sentry/nextjs'
import { fetchWithJWTCookie } from './fetchWithJWTCookie'
import { getUser } from './user'

export async function getUserGroups(): Promise<Group[]> {
  const user = await getUser()
  if (!user) {
    return []
  }
  try {
    return await fetchWithJWTCookie(`${GROUP_URL}/${user.id}`)
  } catch (error) {
    captureException(error)
    return []
  }
}
