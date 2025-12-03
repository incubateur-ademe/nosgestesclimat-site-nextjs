import { USER_URL } from '@/constants/urls/main'
import type { AuthenticatedUser } from '@/types/authentication'
import { cookies } from 'next/headers'
import { fetchWithJWTCookie } from './fetchWithJWTCookie'

export function getUser(): Promise<AuthenticatedUser> {
  return fetchWithJWTCookie(USER_URL + '/me')
}

export async function isUserAuthenticated(): Promise<boolean> {
  try {
    await fetchWithJWTCookie(USER_URL + '/me')

    return true
  } catch (error) {
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
