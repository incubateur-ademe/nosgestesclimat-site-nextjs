'use server'
import { cookies, headers } from 'next/headers'
import { InternalServerError } from '../error'
import { type AuthUser, getAuthUser } from '../model/user'
import { AUTHENTICATED_COOKIE_NAME } from './sessionCookie'

export interface AnonUser {
  id: string
  isAuth: false
}

export type AppUser = AuthUser | AnonUser

export async function getUser(): Promise<AppUser> {
  try {
    return await getAuthUser()
  } catch {
    // Fallback to anonymous user (via session cookie)
    const id = (await headers()).get('x-anon-user-id')
    if (!id) {
      throw new InternalServerError()
    }
    return {
      id,
      isAuth: false,
    }
  }
}

export async function logout() {
  const domain = new URL(process.env.NEXT_PUBLIC_SITE_URL!).hostname
  const secure = domain !== 'localhost'

  ;(await cookies()).delete({
    name: AUTHENTICATED_COOKIE_NAME,
    httpOnly: true,
    secure,
    sameSite: 'lax',
    partitioned: secure,
    domain,
  })

  // The anonymous user ID cookie (ngc_user_id) is NOT regenerated here.
  // The client-side resetLocalState() generates a new UUID in localStorage,
  // which is synced to the cookie automatically.
}
