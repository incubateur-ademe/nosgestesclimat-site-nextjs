import { USER_URL } from '@/constants/urls/main'
import type { AuthenticatedUser } from '@/types/authentication'
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
