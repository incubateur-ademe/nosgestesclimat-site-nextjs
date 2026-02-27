import { AUTHENTICATION_COOKIE_NAME } from '@/constants/authentication/cookie'

import { USER_URL } from '@/constants/urls/main'
import { cookies } from 'next/headers'
import { fetchServer } from './fetchServer'

export interface UserServer {
  id: string
  email: string
}

export async function getAuthUser(): Promise<UserServer> {
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

  // The anonymous user ID cookie (ngc_user_id) is NOT regenerated here.
  // The client-side resetLocalState() generates a new UUID in localStorage,
  // and CookieUserSync syncs it to the cookie automatically.
}

export async function getAuthUserOrNull(): Promise<UserServer | null> {
  try {
    return await getAuthUser()
  } catch {
    return null
  }
}
