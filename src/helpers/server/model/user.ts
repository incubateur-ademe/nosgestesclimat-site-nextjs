import {
  AUTHENTICATION_COOKIE_NAME,
  USER_ID_COOKIE_NAME,
} from '@/constants/authentication/cookie'

import { USER_URL } from '@/constants/urls/main'
import { cookies } from 'next/headers'
import { v4 as uuid } from 'uuid'
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

  const cookieStore = await cookies()

  cookieStore.delete({
    name: AUTHENTICATION_COOKIE_NAME,
    httpOnly: true,
    secure,
    sameSite: 'lax',
    partitioned: secure,
    domain,
  })

  // Regenerate anonymous session cookie so the user gets a fresh identity
  cookieStore.set(USER_ID_COOKIE_NAME, uuid(), {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  })
}

export async function getAuthUserOrNull(): Promise<UserServer | null> {
  try {
    return await getAuthUser()
  } catch {
    return null
  }
}
