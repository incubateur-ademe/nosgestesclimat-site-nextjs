import {
  AUTHENTICATION_COOKIE_NAME,
  USER_ID_COOKIE_NAME,
  USER_ID_COOKIE_OPTIONS,
} from '@/constants/authentication/cookie'
import { cookies } from 'next/headers'
import { randomUUID } from 'node:crypto'
import { type AuthUser, getAuthUser } from '../model/user'

export interface AnonUser {
  id: string
  isAuth: false
}

export type AppUser = AuthUser | AnonUser

export async function getUser(): Promise<AppUser> {
  try {
    return getAuthUser()
  } catch {
    // Fallback to anonymous user (via session cookie)
    const userId = (await cookies()).get(USER_ID_COOKIE_NAME)?.value
    if (userId) {
      return { id: userId, isAuth: false }
    }

    // No user found create a userId cookie
    const newUserId = randomUUID()
    ;(await cookies()).set(
      USER_ID_COOKIE_NAME,
      newUserId,
      USER_ID_COOKIE_OPTIONS
    )

    return {
      id: newUserId,
      isAuth: false,
    }
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
  // which is synced to the cookie automatically.
}
