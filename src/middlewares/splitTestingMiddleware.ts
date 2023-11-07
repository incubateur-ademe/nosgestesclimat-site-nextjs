import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import applySetCookie from './applySetCookie'

const challenger = {
  branch: 'modif-couleurs',
  share: 0.5,
}

const redirectUrl = `https://nosgestesclimat-git-${challenger.branch}-nos-gestes-climat.vercel.app`

function splitTestingMiddleware(request: NextRequest) {
  let splitNumber = request.cookies.get('split-number')?.value
  if (!splitNumber) {
    const randomNumber = Math.random()
    splitNumber = String(randomNumber)
    console.log(request.url, splitNumber)
  } else {
    console.log('GOOD ' + request.url, splitNumber)
  }

  const shouldRedirectToChallenger = Number(splitNumber) < challenger.share

  if (!shouldRedirectToChallenger) {
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
