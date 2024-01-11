import { splitTestingCookieName } from '@/constants/split-testing'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const redirectUrl = `https://nosgestesclimat-git-${process.env.NEXT_PUBLIC_SPLIT_TESTING_BRANCH}-nos-gestes-climat.vercel.app`

export default function splitTestingMiddleware(request: NextRequest) {
  if (!process.env.NEXT_PUBLIC_SPLIT_TESTING_BRANCH) {
    return NextResponse.next()
  }
  let splitNumber = getSplitCookieFromRequest(request)
  let cookie = null
  if (!splitNumber) {
    const randomNumber = Math.random()
    splitNumber = String(randomNumber)
    cookie = generateCookie(splitTestingCookieName, splitNumber)
  }
  const shouldRedirectToChallenger =
    Number(splitNumber) <
    Number(process.env.NEXT_PUBLIC_SPLIT_TESTING_PERCENTAGE ?? 0.5)

  if (!shouldRedirectToChallenger || redirectUrl === request.nextUrl.origin) {
    const response = NextResponse.next()
    if (cookie) {
      console.log('should be setting cookie', cookie)
      response.headers.append('Set-Cookie', cookie)
    }

    return response
  } else {
    const rewriteTo = `${redirectUrl}${request.nextUrl.href.replace(
      request.nextUrl.origin,
      ''
    )}`
    const response = NextResponse.rewrite(rewriteTo)
    if (cookie) {
      response.headers.append('Set-Cookie', cookie)
    }

    return response
  }
}

function getSplitCookieFromRequest(request: NextRequest) {
  const cookieString = request.headers
    .get('cookie')
    ?.split('; ')
    .find((cookieString) => cookieString.includes(splitTestingCookieName))

  if (!cookieString) return null
  return cookieString
    .split(';')[0]
    .replace(splitTestingCookieName, '')
    .replace('=', '')
}

export function generateCookie(name: string, value: string) {
  return `${name}=${value}; Path=/; SameSite=None; Secure`
}
