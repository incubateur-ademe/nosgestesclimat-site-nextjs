import { getIronSession } from 'iron-session'
import { isMatch } from 'micromatch'
import type { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'node:crypto'
import {
  type AnonSessionData,
  anonSessionOptions,
  getAnonSession,
} from './anonSession'

export const ANON_USER_ID_HEADER = 'x-anon-user-id'

const PATHS_WITHOUT_ANON_SESSION = [
  `/blog/**`,
  `/accessibilite`,
  `/mentions-legales`,
]

/**
 * Middleware that ensures an encrypted anonymous session cookie exists for
 * all routes except blacklisted ones. The session contains a `userId` (UUID)
 * that identifies the anonymous user.
 *
 * Server actions read the session directly via `getAnonSession()`.
 *
 * Routes in `PATHS_WITHOUT_ANON_SESSION` are passed through without creating
 * a session, but an existing session cookie is still readable from anywhere via
 * `getAnonSession()`.
 */
export async function userMiddleware(
  request: NextRequest,
  next: (req: NextRequest) => NextResponse
) {
  if (isMatch(request.nextUrl.pathname, PATHS_WITHOUT_ANON_SESSION)) {
    return next(request)
  }

  const session = await getAnonSession()
  if (session.userId) {
    return next(request)
  }

  const userId = randomUUID()

  // We cannot set a session in the request object directly (like we would have done in any normal framework)
  // In that case, we need to pass this information in the header.
  //
  // So the priority for getting the userId in the app is :
  // 1. Server session cookie (API)
  // 2. Anon session cookie
  // 3. x-anon-user-id header, when no cookie is set (first visit)
  // This logic is mirrored in ./user.ts
  request.headers.set(ANON_USER_ID_HEADER, userId)
  const response = next(request)
  const newSession = await getIronSession<AnonSessionData>(
    request,
    response,
    anonSessionOptions
  )
  newSession.userId = userId
  await newSession.save()

  return response
}
