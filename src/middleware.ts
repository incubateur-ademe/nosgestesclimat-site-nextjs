import { splitTestingCookieName } from '@/constants/split-testing'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import i18nMiddleware from './middlewares/i18nMiddleware'
import splitTestingMiddleware from './middlewares/splitTestingMiddleware'

export const middlewares = [splitTestingMiddleware, i18nMiddleware]

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  for await (const middlewareFunction of middlewares) {
    const middlewareResponse = await middlewareFunction(request)
    if (isRedirecting(middlewareResponse)) {
      return middlewareResponse
    }
    if (isRewriting(middlewareResponse)) {
      return middlewareResponse
    }
    if (isI18n(middlewareResponse)) {
      return middlewareResponse
    }
    const splitCookie = getSplitCookieFromResponse(middlewareResponse)
    if (splitCookie) {
      response.cookies.set(splitTestingCookieName, splitCookie)
    }
  }
  return response
}
function isRedirecting(response: NextResponse): boolean {
  return response.status === 307 || response.status === 308
}
function isRewriting(response: NextResponse): boolean {
  return response.headers.has('x-middleware-rewrite')
}
function isI18n(response: NextResponse): boolean {
  return response.headers.has('x-next-i18n-router-locale')
}

function getSplitCookieFromResponse(response: NextResponse) {
  const cookie = response.headers
    .getSetCookie()
    .find((cookie) => cookie.includes(splitTestingCookieName))

  if (!cookie) return null

  const cookieNumber = cookie
    .replace(splitTestingCookieName, '')
    .replace('=', '')
    .replace('; Path=/', '')
  return cookieNumber
}
