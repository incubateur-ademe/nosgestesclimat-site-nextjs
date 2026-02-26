import type { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'

export const AUTHENTICATION_COOKIE_NAME = process.env.COOKIE_NAME ?? 'ngcjwt2'
export const USER_ID_COOKIE_NAME = 'ngc_user_id'

export const USER_ID_COOKIE_OPTIONS: Partial<ResponseCookie> = {
  path: '/',
  maxAge: 60 * 60 * 24 * 365, // 1 year
  sameSite: 'lax',
  secure: true,
  httpOnly: true,
}
