import { GROUP_URL } from '@/constants/urls/main'
import type { Group } from '@/types/groups'
import { fetchWithJWTCookie } from './fetchWithJWTCookie'
import { getUser } from './user'

export async function getUserGroups(): Promise<Group[]> {
  const user = await getUser()
  return fetchWithJWTCookie(`${GROUP_URL}/${user.id}`)
}
