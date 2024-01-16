import { splitTestingCookieName } from '@/constants/split-testing'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const redirectUrl = `https://nosgestesclimat-git-${process.env.NEXT_PUBLIC_SPLIT_TESTING_BRANCH}-nos-gestes-climat.vercel.app`

export default function splitTestingMiddleware(request: NextRequest) {
  if (!process.env.NEXT_PUBLIC_SPLIT_TESTING_BRANCH) {
    return NextResponse.next()
  }

  const host = request.headers.get('host')
  const referrer = request.headers.get('referer')

  let splitNumber = getSplitCookieFromRequest(request)

  console.log('--------------')
  console.log('splitNumber', splitNumber)
  console.log('request.nextUrl.href', request.nextUrl.href)
  console.log('request.nextUrl.origin', request.nextUrl.origin)
  console.log('referrer', referrer)
  console.log('host', host)
  // If the host and referrer are differents, we may be inside an iframe
  if ((!host || !referrer || !referrer.includes(host)) && !splitNumber) {
    console.log(
      'splitTestingMiddleware: inside an iframe -------------------------------------------------'
    )
    return NextResponse.next()
  }

  // If no cookie is set and we are allready fetching files, we may be inside an iframe
  if (!splitNumber && request.nextUrl.href.includes('.')) {
    return NextResponse.next()
  }

  // If no split cookie is set, we generate a random number
  if (!splitNumber) {
    const randomNumber = Math.random()
    splitNumber = String(randomNumber)
  }

  const shouldRedirectToChallenger =
    Number(splitNumber) <
    Number(process.env.NEXT_PUBLIC_SPLIT_TESTING_PERCENTAGE ?? 0.5)

  if (!shouldRedirectToChallenger || redirectUrl === request.nextUrl.origin) {
    const response = NextResponse.next()
    response.cookies.set(splitTestingCookieName, splitNumber)
    return response
  } else {
    const rewriteTo = `${redirectUrl}${request.nextUrl.href.replace(
      request.nextUrl.origin,
      ''
    )}`
    const response = NextResponse.rewrite(rewriteTo)
    response.cookies.set(splitTestingCookieName, splitNumber)
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
