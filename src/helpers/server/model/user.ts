import { USER_URL } from '@/constants/urls/main'
import { captureException } from '@sentry/nextjs'
import { cookies } from 'next/headers'
import { fetchWithJWTCookie } from './fetchWithJWTCookie'

export interface UserServer {
  id: string
  email: string
}

export interface BrevoContact {
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

export async function getUser(): Promise<UserServer> {
  return fetchWithJWTCookie(USER_URL + '/me')
}

export async function getCompleteUser(): Promise<CompleteUserServer | null> {
  const user = await getUser()

  if (!user) {
    return null
  }
  try {
    return (await fetchWithJWTCookie(
      `${USER_URL}/${user.id}`
    )) as Promise<CompleteUserServer>
  } catch (error) {
    console.error('Error fetching complete user', error)
    captureException(error)
    return null
  }
}

export async function isUserAuthenticated(): Promise<boolean> {
  try {
    const user = (await fetchWithJWTCookie(
      USER_URL + '/me'
    )) as UserServer | null
    return !!user
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
