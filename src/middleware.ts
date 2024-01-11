import { splitTestingCookieName } from '@/constants/split-testing'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import i18nMiddleware from './middlewares/i18nMiddleware'
import splitTestingMiddleware, {
  generateCookie,
} from './middlewares/splitTestingMiddleware'

export const middlewares = [splitTestingMiddleware, i18nMiddleware]

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  let splitNumber = null
  for await (const middlewareFunction of middlewares) {
    const middlewareResponse = await middlewareFunction(request)
    // Even if we don't redirect, we still need to keep the split cookie for the next response
    if (!splitNumber) {
      splitNumber = getSplitCookieFromResponse(middlewareResponse)
    }

    if (splitNumber) {
      const cookie = generateCookie(splitTestingCookieName, splitNumber)
      response.headers.append('Set-Cookie', cookie)
      middlewareResponse.headers.append('Set-Cookie', cookie)
    }

    if (isRedirecting(middlewareResponse)) {
      return middlewareResponse
    }
    if (isRewriting(middlewareResponse)) {
      return middlewareResponse
    }
    if (isI18n(middlewareResponse)) {
      return middlewareResponse
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
    .split(';')[0]
    .replace(splitTestingCookieName, '')
    .replace('=', '')
  return cookieNumber
}
