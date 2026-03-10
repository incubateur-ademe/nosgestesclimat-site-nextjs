import {
  USER_ID_COOKIE_NAME,
  USER_ID_COOKIE_OPTIONS,
} from '@/constants/authentication/cookie'
import { cookies } from 'next/headers'
import { v4 as uuid } from 'uuid'
import { getAuthUser } from '../model/user'

interface AuthUser {
  id: string
  email: string
  isAuth: true
}

interface AnonUser {
  id: string
  isAuth: false
}

export type AppUser = AuthUser | AnonUser

export async function getUser(): Promise<AppUser> {
  // Try authenticated user (via JWT cookie)
  let user
  try {
    user = await getAuthUser()

    return { id: user.id, email: user.email, isAuth: true }
  } catch {
    // Fallback to anonymous user (via session cookie)
    const userId = (await cookies()).get(USER_ID_COOKIE_NAME)?.value

    if (userId) {
      return { id: userId, isAuth: false }
    }

    // No user found create a userId cookie
    const newUserId = uuid()
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
