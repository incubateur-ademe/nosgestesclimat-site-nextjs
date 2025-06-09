import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import i18nMiddleware from './middlewares/i18nMiddleware'
import splitTestingMiddleware from './middlewares/splitTestingMiddleware'

function isRedirecting(response: NextResponse): boolean {
  return response.status === 307 || response.status === 308
}
function isRewriting(response: NextResponse): boolean {
  return response.headers.has('x-middleware-rewrite')
}
function isI18n(response: NextResponse): boolean {
  return response.headers.has('x-next-i18n-router-locale')
}

export const middlewares = [splitTestingMiddleware, i18nMiddleware]

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  for await (const middlewareFunction of middlewares) {
    const middlewareResponse = middlewareFunction(request)

    if (
      middlewareResponse &&
      (isRedirecting(middlewareResponse) ||
        isRewriting(middlewareResponse) ||
        isI18n(middlewareResponse))
    ) {
      return middlewareResponse
    }
  }
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files) - only excluded when split testing is not active
     * - images (image optimization files)
     * - favicon.ico (favicon file)
     * - manifest.webmanifest (manifest file)
     * - robots.txt (robots file)
     */
    {
      source: process.env.NEXT_PUBLIC_SPLIT_TESTING_PR_NUMBER
        ? '/((?!api|_next/image|favicon.ico|favicon.png|images|manifest.webmanifest|scripts|demos|misc|videos|robots.txt).*)'
        : '/((?!api|_next/static|_next/image|favicon.ico|favicon.png|images|manifest.webmanifest|scripts|demos|misc|videos|robots.txt).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}
