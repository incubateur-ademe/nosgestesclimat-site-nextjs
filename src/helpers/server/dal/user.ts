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

export async function getUser(): Promise<AppUser | null> {
  // Try authenticated user (via JWT cookie)
  const authUser = await getAuthUserOrNull()
  if (authUser) {
    return { id: authUser.id, email: authUser.email, isAuth: true }
  }

  // Fallback to anonymous user (via session cookie)
  const userId = (await cookies()).get(USER_ID_COOKIE_NAME)?.value
  if (userId) {
    return { id: userId, isAuth: false }
  }

  // No user found
  return null
}
