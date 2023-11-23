import { NextRequest } from 'next/server'
import i18nMiddleware from './middlewares/i18nMiddleware'
import splitTestingMiddleware from './middlewares/splitTestingMiddleware'

export const config = {
  matchers: ['/((?!api|_next/image|favicon.ico|images).*)'],
}

export async function middleware(request: NextRequest) {
  // If we are on the main branch (production)
  if (!process.env.NEXT_PUBLIC_SPLIT_TESTING_BRANCH) {
    return i18nMiddleware(request)
  }

  return splitTestingMiddleware(request, i18nMiddleware(request))
}
