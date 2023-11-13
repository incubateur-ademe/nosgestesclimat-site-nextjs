import applySetCookie from '@/utils/applySetCookie'
import { NextRequest, NextResponse } from 'next/server'
import challenger from '../../split-testing'

const redirectUrl = `https://nosgestesclimat-git-${challenger.branch}-nos-gestes-climat.vercel.app`

const cookieName = `split-number-${challenger.branch}`

function updateResponseHeaders({
  i18nRouterResponse,
  response,
}: {
  i18nRouterResponse: any
  response: any
}) {
  if (
    i18nRouterResponse.headers.get('x-middleware-rewrite') &&
    i18nRouterResponse.headers.get('x-next-i18n-router-locale')
  ) {
    response.headers.set(
      'x-middleware-rewrite',
      i18nRouterResponse.headers.get('x-middleware-rewrite')
    )
    response.headers.set(
      'x-next-i18n-router-locale',
      i18nRouterResponse.headers.get('x-next-i18n-router-locale')
    )
  }
}

const splitTestingMiddleware = (
  request: NextRequest,
  i18nRouterResponse: any
) => {
  let splitNumber = request.cookies.get(cookieName)?.value

  if (!splitNumber) {
    const randomNumber = Math.random()

    splitNumber = String(randomNumber)
  }

  const shouldRedirectToChallenger = Number(splitNumber) < challenger.share

  if (!shouldRedirectToChallenger || redirectUrl === request.nextUrl.origin) {
    const response = NextResponse.next()

    response.cookies.set(cookieName, splitNumber)

    updateResponseHeaders({ i18nRouterResponse, response })

    applySetCookie(request, response)

    return response
  }

  const rewriteTo = `${redirectUrl}${request.nextUrl.href.replace(
    request.nextUrl.origin,
    ''
  )}`

  const response = NextResponse.rewrite(rewriteTo)

  response.cookies.set(cookieName, splitNumber)

  updateResponseHeaders({ i18nRouterResponse, response })

  applySetCookie(request, response)

  return response
}

export default splitTestingMiddleware
