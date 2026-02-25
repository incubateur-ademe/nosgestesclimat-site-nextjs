import { USER_ID_COOKIE_NAME } from '@/constants/authentication/cookie'
import { cookies } from 'next/headers'
import { getAuthUserOrNull } from '../model/user'

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

/**
 * Reads the anonymous user ID from the `ngc_user_id` cookie.
 * Used as `initialUserId` prop for `UserProvider` in Server Components.
 */
export async function getInitialUserId(): Promise<string | undefined> {
  return (await cookies()).get(USER_ID_COOKIE_NAME)?.value
}

export async function getUser(): Promise<AppUser | null> {
  // Try authenticated user (via JWT cookie)
  const authUser = await getAuthUserOrNull()
  if (authUser) {
    return { id: authUser.id, email: authUser.email, isAuth: true }
  }

  // Fallback to anonymous user (via session cookie)
  const userId = await getInitialUserId()
  if (userId) {
    return { id: userId, isAuth: false }
  }

  // No user found
  return null
}
