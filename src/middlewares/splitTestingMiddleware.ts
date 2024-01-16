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

  console.log('splitTestingMiddleware: splitNumber', splitNumber)

  // If the host and referrer are differents, we may be inside an iframe
  if ((!host || !referrer || !referrer.includes(host)) && !splitNumber) {
    console.log(
      'splitTestingMiddleware: inside an iframe ------------------------------------------------'
    )
    return NextResponse.next()
  }

  // If no cookie is set and we are allready fetching files, we may be inside an iframe
  const regex =
    /\.(?:png|jpg|jpeg|gif|bmp|svg|webp|woff|woff2|js|css|webmanifest|well-known)/i
  if (!splitNumber && regex.test(request.nextUrl.href)) {
    console.log(
      'splitTestingMiddleware: inside an iframe (regex) ------------------------------ '
    )
    return NextResponse.next()
  }

  // If no split cookie is set, we generate a random number
  if (!splitNumber) {
    console.log('generate random number')
    const randomNumber = Math.random()
    splitNumber = String(randomNumber)
  }

  const shouldRedirectToChallenger =
    Number(splitNumber) <
    Number(process.env.NEXT_PUBLIC_SPLIT_TESTING_PERCENTAGE ?? 0.5)

  if (!shouldRedirectToChallenger || redirectUrl === request.nextUrl.origin) {
    console.log('splitTestingMiddleware: redirect to challenger')
    const response = NextResponse.next()
    response.cookies.set(splitTestingCookieName, splitNumber)
    return response
  } else {
    console.log('splitTestingMiddleware: redirect to control')
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
