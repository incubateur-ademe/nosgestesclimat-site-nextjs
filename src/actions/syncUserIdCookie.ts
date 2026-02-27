'use server'

import {
  USER_ID_COOKIE_NAME,
  USER_ID_COOKIE_OPTIONS,
} from '@/constants/authentication/cookie'
import { cookies } from 'next/headers'

export async function syncUserIdCookie(userId: string) {
  ;(await cookies()).set(USER_ID_COOKIE_NAME, userId, USER_ID_COOKIE_OPTIONS)
}
