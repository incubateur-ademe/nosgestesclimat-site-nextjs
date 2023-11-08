import applySetCookie from '@/utils/applySetCookie'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import challenger from '../../split-testing'

const redirectUrl = `https://nosgestesclimat-git-${challenger.branch}-nos-gestes-climat.vercel.app`

function splitTestingMiddleware(request: NextRequest) {
  let splitNumber = request.cookies.get('split-number')?.value
  if (!splitNumber) {
    const randomNumber = Math.random()
    splitNumber = String(randomNumber)
  }

  const shouldRedirectToChallenger = Number(splitNumber) < challenger.share

  if (!shouldRedirectToChallenger || redirectUrl === request.nextUrl.origin) {
    const response = NextResponse.next()
    response.cookies.set('split-number', splitNumber)
    applySetCookie(request, response)
    return response
  } else {
    const rewriteTo = `${redirectUrl}${request.nextUrl.href.replace(
      request.nextUrl.origin,
      ''
    )}`
    const response = NextResponse.rewrite(rewriteTo)
    response.cookies.set('split-number', splitNumber)
    applySetCookie(request, response)
    return response
  }
}

export default splitTestingMiddleware
