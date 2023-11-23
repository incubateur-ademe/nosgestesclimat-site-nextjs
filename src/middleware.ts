import { NextRequest, NextResponse } from 'next/server'
import i18nMiddleware from './middlewares/i18nMiddleware'
import splitTestingMiddleware from './middlewares/splitTestingMiddleware'

export const config = {
  matchers: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)'],
}

export async function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname?.match('/((api|_next/image|favicon.ico|images).*)')
  ) {
    return NextResponse.next()
  }

  // If we are on the main branch (production)
  if (!process.env.NEXT_PUBLIC_SPLIT_TESTING_BRANCH) {
    return i18nMiddleware(request)
  }

  return splitTestingMiddleware(request, i18nMiddleware(request))
}
