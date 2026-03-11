import { isMatch } from 'micromatch'
import { type NextRequest, type NextResponse } from 'next/server'
import { randomUUID } from 'node:crypto'
import {
  ANON_SESSION_COOKIE_NAME,
  ANON_SESSION_COOKIE_OPTION,
} from './sessionCookie'

const PATHS_WITH_ANON_SESSION = [
  `/`,
  `/simulateur/**`,
  `/simulation/**`,
  `/connexion`,
  `/inscription`,
  `/amis/**`,
]

export function userMiddleware(
  request: NextRequest,
  next: (req: NextRequest) => NextResponse
) {
  if (!isMatch(request.nextUrl.pathname, PATHS_WITH_ANON_SESSION)) {
    return next(request)
  }
  const userId =
    request.cookies.get(ANON_SESSION_COOKIE_NAME)?.value ?? randomUUID()
  request.headers.set('x-anon-user-id', userId)

  const response = next(request)

  response.cookies.set({
    name: ANON_SESSION_COOKIE_NAME,
    value: userId,
    ...ANON_SESSION_COOKIE_OPTION,
  })

  return response
}
