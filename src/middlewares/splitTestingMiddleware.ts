import { splitTestingCookieName } from '@/constants/split-testing'
import applySetCookie from '@/utils/applySetCookie'
import { NextRequest, NextResponse } from 'next/server'

const redirectUrl = `https://nosgestesclimat-git-${process.env.NEXT_PUBLIC_SPLIT_TESTING_BRANCH}-nos-gestes-climat.vercel.app`

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
  let splitNumber = request.cookies.get(splitTestingCookieName)?.value

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

    updateResponseHeaders({ i18nRouterResponse, response })

    applySetCookie(request, response)

    return response
  }

  // If the request tries to access static files, we don't want to redirect
  const rewriteTo = /*request.nextUrl.href.match('/((_next/static).*)')
    ? request.nextUrl.href
    : */ `${redirectUrl}${request.nextUrl.href.replace(
    request.nextUrl.origin,
    ''
  )}`

  const response = NextResponse.rewrite(rewriteTo)

  response.cookies.set(splitTestingCookieName, splitNumber)

  updateResponseHeaders({ i18nRouterResponse, response })

  applySetCookie(request, response)

  return response
}

export default splitTestingMiddleware
