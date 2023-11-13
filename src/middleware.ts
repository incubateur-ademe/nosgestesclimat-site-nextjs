import { type NextRequest } from 'next/server'
import i18nMiddleware from './middlewares/i18nMiddleware'
import splitTestingMiddleware from './middlewares/splitTestingMiddleware'

export const config = {
  matchers: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)'],
}

export async function middleware(request: NextRequest) {
  return splitTestingMiddleware(request, i18nMiddleware(request))
}
