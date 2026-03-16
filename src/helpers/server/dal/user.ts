'use server'

import { cookies, headers } from 'next/headers'
import { cache } from 'react'
import { InternalServerError } from '../error'
import { type AuthUser, getAuthUser } from '../model/user'
import { getAnonSession } from './anonSession'
import { AUTHENTICATED_COOKIE_NAME, DEFAULT_COOKIE_OPTION } from './authCookie'
import { ANON_USER_ID_HEADER } from './middleware'

export interface AnonUser {
  id: string
  isAuth: false
}

export type AppUser = AuthUser | AnonUser

export const getUser = cache(async function (): Promise<AppUser> {
  try {
    return await getAuthUser()
  } catch {
    // Fallback to anonymous user.
    // 1. Try the session cookie first (set on previous visits).
    const session = await getAnonSession()
    if (session.userId) {
      return {
        id: session.userId,
        isAuth: false,
      }
    }

    // 2. For brand-new users the Set-Cookie header has not been flushed yet
    //    when the Server Component renders, so the cookie is not readable via
    //    getAnonSession(). The middleware injects the freshly-generated userId
    //    as a trusted request header instead.
    const userId = (await headers()).get(ANON_USER_ID_HEADER)
    if (userId) {
      return {
        id: userId,
        isAuth: false,
      }
    }

    throw new InternalServerError()
  }
})

export async function logout() {
  ;(await cookies()).delete({
    name: AUTHENTICATED_COOKIE_NAME,
    ...DEFAULT_COOKIE_OPTION,
  })

  // The anonymous user ID cookie (ngc_anon_session) is NOT regenerated here.
  // The client-side resetLocalState() generates a new UUID in localStorage,
  // which is synced to the cookie automatically via migrateAnonSession.
}
