import type { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'

export const AUTHENTICATED_COOKIE_NAME = process.env.COOKIE_NAME ?? 'ngcjwt2'

export const ANON_SESSION_COOKIE_NAME = 'ngc_user_id'
export const ANON_SESSION_COOKIE_OPTION: Partial<ResponseCookie> = {
  path: '/',
  maxAge: 60 * 60 * 24 * 365 * 2, // 2 years
  sameSite: 'lax',
  secure: true,
  httpOnly: true,
}
