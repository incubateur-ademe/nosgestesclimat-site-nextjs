import {
  USER_ID_COOKIE_NAME,
  USER_ID_COOKIE_OPTIONS,
} from '@/constants/authentication/cookie'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { v4 as uuid } from 'uuid'
import i18nMiddleware from './middlewares/i18nMiddleware'

function isRedirecting(response: NextResponse): boolean {
  return response.status === 307 || response.status === 308
}
function isRewriting(response: NextResponse): boolean {
  return response.headers.has('x-middleware-rewrite')
}
function isI18n(response: NextResponse): boolean {
  return response.headers.has('x-next-i18n-router-locale')
}

export function proxy(request: NextRequest) {
  const middlewareResponse = i18nMiddleware(request)

  if (
    isRedirecting(middlewareResponse) ||
    isRewriting(middlewareResponse) ||
    isI18n(middlewareResponse)
  ) {
    return middlewareResponse
  }

  // Add pathname to headers for server components
  const response = NextResponse.next()
  response.headers.set('x-pathname', request.nextUrl.pathname)

  // Generate a session cookie for anonymous user identification if not present
  if (!request.cookies.get(USER_ID_COOKIE_NAME)) {
    response.cookies.set(USER_ID_COOKIE_NAME, uuid(), USER_ID_COOKIE_OPTIONS)
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - images (image optimization files)
     * - favicon.ico (favicon file)
     * - manifest.webmanifest (manifest file)
     * - robots.txt (robots file)
     */
    {
      source:
        '/((?!api|_next/static|_next/image|favicon.ico|favicon.png|images|manifest.webmanifest|scripts|demos|misc|videos|robots.txt|datashare).*)',
    },
  ],
}
