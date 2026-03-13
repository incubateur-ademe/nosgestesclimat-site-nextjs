import { getIronSession } from 'iron-session'
import { isMatch } from 'micromatch'
import { type NextRequest, type NextResponse } from 'next/server'
import { randomUUID } from 'node:crypto'
import { type AnonSessionData, anonSessionOptions } from './anonSession'

const PATHS_WITH_ANON_SESSION = [
  `/`,
  `/simulateur/**`,
  `/fin/**`,
  `/connexion`,
  `/inscription`,
  `/amis/**`,
]

/**
 * Middleware that ensures an encrypted anonymous session cookie exists for
 * whitelisted routes.  The session contains a `userId` (UUID) that identifies
 * the anonymous user.
 *
 * Server components and server actions read the session directly via
 * `getAnonSession()` — no request header forwarding needed.
 *
 * Routes not in `PATHS_WITH_ANON_SESSION` are passed through without creating
 * a session, but an existing session cookie is still readable from anywhere via
 * `getAnonSession()`.
 */
export async function userMiddleware(
  request: NextRequest,
  next: (req: NextRequest) => NextResponse
) {
  if (!isMatch(request.nextUrl.pathname, PATHS_WITH_ANON_SESSION)) {
    return next(request)
  }

  const response = next(request)

  const session = await getIronSession<AnonSessionData>(
    request,
    response,
    anonSessionOptions
  )

  if (!session.userId) {
    session.userId = randomUUID()
    await session.save()
  }

  return response
}
