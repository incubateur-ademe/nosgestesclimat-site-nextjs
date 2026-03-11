'use server'
import { cookies } from 'next/headers'
import {
  ANON_SESSION_COOKIE_NAME,
  ANON_SESSION_COOKIE_OPTION,
} from '../dal/sessionCookie'

export async function setAnonSessionCookie(userId: string) {
  ;(await cookies()).set(
    ANON_SESSION_COOKIE_NAME,
    userId,
    ANON_SESSION_COOKIE_OPTION
  )
}
