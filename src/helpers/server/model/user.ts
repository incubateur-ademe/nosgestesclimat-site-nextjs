import { AUTHENTICATION_COOKIE_NAME } from '@/constants/authentication/cookie'

import { USER_URL } from '@/constants/urls/main'
import { cookies } from 'next/headers'
import { fetchServer } from './fetchServer'

export interface UserServer {
  id: string
  email: string
}

export async function getUser(): Promise<UserServer> {
  return fetchServer(USER_URL + '/me')
}

export async function isUserAuthenticated(): Promise<boolean> {
  try {
    const user = await fetchServer<UserServer>(USER_URL + '/me')
    return !!user
  } catch {
    return false
  }
}

export async function logout() {
  const domain = new URL(process.env.NEXT_PUBLIC_SITE_URL!).hostname
  const secure = domain !== 'localhost'

  ;(await cookies()).delete({
    name: AUTHENTICATION_COOKIE_NAME,
    httpOnly: true,
    secure,
    sameSite: 'lax',
    partitioned: secure,
    domain,
  })
}
