import applySetCookie from '@/utils/applySetCookie'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import challenger from '../../split-testing'

const redirectUrl = `https://nosgestesclimat-git-${challenger.branch}-nos-gestes-climat.vercel.app`

function splitTestingMiddleware(request: NextRequest) {
  let splitNumber = request.cookies.get('split-number')?.value

  console.log('line 11', splitNumber)

  if (!splitNumber) {
    const randomNumber = Math.random()

    splitNumber = String(randomNumber)
    console.log('line 17', splitNumber)
  }

  const shouldRedirectToChallenger = Number(splitNumber) < challenger.share
  console.log('line 21', shouldRedirectToChallenger)
  if (!shouldRedirectToChallenger || redirectUrl === request.nextUrl.origin) {
    const response = NextResponse.next()

    response.cookies.set('split-number', splitNumber)

    applySetCookie(request, response)

    return response
  }

  const rewriteTo = `${redirectUrl}${request.nextUrl.href.replace(
    request.nextUrl.origin,
    ''
  )}`

  const response = NextResponse.rewrite(rewriteTo)

  response.cookies.set('split-number', splitNumber)

  applySetCookie(request, response)

  return response
}

export default splitTestingMiddleware
