import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import i18nMiddleware from './middlewares/i18nMiddleware'
import splitTestingMiddleware from './middlewares/splitTestingMiddleware'

export const middlewares = [i18nMiddleware, splitTestingMiddleware]

export async function middleware(request: NextRequest) {
  if (!request.nextUrl.href.match('/((?!api|static|_next).*)')) {
    const response = NextResponse.next()
    return response
  }

  return splitTestingMiddleware(request, i18nMiddleware(request))
}
