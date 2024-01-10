import { splitTestingCookieName } from '@/constants/split-testing'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const redirectUrl = `https://nosgestesclimat-git-${process.env.NEXT_PUBLIC_SPLIT_TESTING_BRANCH}-nos-gestes-climat.vercel.app`

export default function splitTestingMiddleware(request: NextRequest) {
  if (!process.env.NEXT_PUBLIC_SPLIT_TESTING_BRANCH) {
    return NextResponse.next()
  }

  let splitNumber = getSplitCookieFromRequest(request)
  if (!splitNumber) {
    const randomNumber = Math.random()
    splitNumber = String(randomNumber)
  }

  const shouldRedirectToChallenger =
    Number(splitNumber) <
    Number(process.env.NEXT_PUBLIC_SPLIT_TESTING_PERCENTAGE ?? 0.5)

  if (!shouldRedirectToChallenger || redirectUrl === request.nextUrl.origin) {
    const response = NextResponse.next()
    response.cookies.set(splitTestingCookieName, splitNumber, {
      sameSite: 'lax',
    })
    return response
  } else {
    const rewriteTo = `${redirectUrl}${request.nextUrl.href.replace(
      request.nextUrl.origin,
      ''
    )}`
    const response = NextResponse.rewrite(rewriteTo)
    response.cookies.set(splitTestingCookieName, splitNumber, {
      sameSite: 'lax',
    })
    return response
  }
}

function getSplitCookieFromRequest(request: NextRequest) {
  const cookieString = request.headers
    .get('cookie')
    ?.split('; ')
    .find((cookieString) => cookieString.includes(splitTestingCookieName))

  if (!cookieString) return null

  return cookieString.replace(splitTestingCookieName, '').replace('=', '')
}
