import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import i18nMiddleware from './middlewares/i18nMiddleware'

function isI18n(response: NextResponse): boolean {
  return response.headers.has('x-next-i18n-router-locale')
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  if (isI18n(response)) {
    return i18nMiddleware(request)
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
        '/((?!api|_next/static|_next/image|favicon.ico|favicon.png|images|manifest.webmanifest|demos|misc|videos|robots.txt).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}
