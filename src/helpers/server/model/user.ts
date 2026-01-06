import { USER_URL } from '@/constants/urls/main'
import { cookies } from 'next/headers'
import { fetchWithJWTCookie } from './fetchWithJWTCookie'

export interface UserServer {
  id: string
  email: string
}

interface BrevoContact {
  id: number
  email: string
  listIds: number[]
}

export type CompleteUserServer = UserServer & {
  id: string
  email: string | null
  name: string | null
  createdAt: Date
  updatedAt: Date
  contact?: BrevoContact
}

export function getUser(): Promise<UserServer> {
  return fetchWithJWTCookie(USER_URL + '/me')
}

export async function getCompleteUser(): Promise<CompleteUserServer> {
  const user = await getUser()
  return fetchWithJWTCookie(`${USER_URL}/${user.id}`)
}

export async function isUserAuthenticated(): Promise<boolean> {
  try {
    await fetchWithJWTCookie(USER_URL + '/me')

    return true
  } catch {
    return false
  }
}

export async function logout() {
  ;(await cookies()).delete({
    name: 'ngcjwt',
    httpOnly: true,
    secure: true,
    partitioned: true,
    sameSite: 'lax',
  })
}
