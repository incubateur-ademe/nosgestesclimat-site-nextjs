import { getIronSession, type SessionOptions } from 'iron-session'
import { cookies } from 'next/headers'

export interface AnonSessionData {
  userId: string
  /**
   * Whether the session has been seeded from the client's localStorage userId.
   * Once `true`, the userId can no longer be overwritten by the client.
   * Stays `undefined` for new users (no prior localStorage to migrate).
   */
  migrated?: boolean
}

if (!process.env.IRON_SESSION_PASSWORD) {
  throw new Error(
    'IRON_SESSION_PASSWORD environment variable is required. It must be at least 32 characters long.'
  )
}

const TWO_YEARS_IN_SECONDS = 60 * 60 * 24 * 365 * 2

export const anonSessionOptions: SessionOptions = {
  password: process.env.IRON_SESSION_PASSWORD,
  cookieName: 'ngc_anon_session',
  ttl: TWO_YEARS_IN_SECONDS,
  cookieOptions: {
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
  },
}

export async function getAnonSession() {
  return getIronSession<AnonSessionData>(await cookies(), anonSessionOptions)
}
