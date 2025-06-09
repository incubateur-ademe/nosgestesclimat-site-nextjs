import { trackingSplitTestingRedirect } from '@/constants/tracking/misc'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import googleBots from './excludedIPs/googlebot.json'
import specialCrawlers from './excludedIPs/special-crawlers.json'
import userTriggeredFetchers from './excludedIPs/user-triggered-fetchers.json'

const redirectUrl = `https://nosgestesclimat-site-preprod-pr${process.env.NEXT_PUBLIC_SPLIT_TESTING_PR_NUMBER}.osc-fr1.scalingo.io`
const SPLIT_TESTING_COOKIE = 'ngc_split_testing'

function isIPv4(ip: string) {
  const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}$/
  return ipv4Pattern.test(ip)
}

// https://developers.google.com/search/docs/crawling-indexing/verifying-googlebot?hl=fr
function isGoogleBot(ip: string) {
  return [
    ...googleBots.prefixes,
    ...specialCrawlers.prefixes,
    ...userTriggeredFetchers.prefixes,
  ]
    .reduce((acc, prefixObject) => {
      const isV4 = prefixObject['ipv4Prefix']

      if (isV4) {
        acc.push(prefixObject['ipv4Prefix'])
      }
      return acc
    }, [] as string[])
    ?.includes(ip)
}

export default function splitTestingMiddleware(request: NextRequest) {
  if (!process.env.NEXT_PUBLIC_SPLIT_TESTING_PR_NUMBER) {
    return NextResponse.next()
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip')

  if (!ip || !isIPv4(ip) || isGoogleBot(ip)) {
    return NextResponse.next()
  }

  // Récupérer ou créer la valeur de split testing
  let splitTestingValue = request.cookies.get(SPLIT_TESTING_COOKIE)?.value

  if (!splitTestingValue) {
    splitTestingValue = Math.random().toString()
  }

  const shouldRedirectToChallenger =
    Number(splitTestingValue) <
    Number(process.env.NEXT_PUBLIC_SPLIT_TESTING_PERCENTAGE ?? 0.5)

  if (!shouldRedirectToChallenger || redirectUrl === request.nextUrl.origin) {
    const response = NextResponse.next()
    // Si le cookie n'existe pas, on le crée
    if (!request.cookies.get(SPLIT_TESTING_COOKIE)) {
      response.cookies.set(SPLIT_TESTING_COOKIE, splitTestingValue, {
        maxAge: 60 * 60 * 24 * 30, // 30 jours
        path: '/',
      })
    }
  } else {
    const rewriteTo = `${redirectUrl}${request.nextUrl.href.replace(
      request.nextUrl.origin,
      ''
    )}`

    const response = NextResponse.rewrite(rewriteTo)

    // Si le cookie n'existe pas, on le crée
    if (!request.cookies.get(SPLIT_TESTING_COOKIE)) {
      response.cookies.set(SPLIT_TESTING_COOKIE, splitTestingValue, {
        maxAge: 60 * 60 * 24 * 30, // 30 jours
        path: '/',
      })
    }

    // Add Matomo tracking event
    const trackingEvent = trackingSplitTestingRedirect(
      process.env.NEXT_PUBLIC_SPLIT_TESTING_PR_NUMBER
    )
    response.headers.set('x-matomo-tracking', JSON.stringify(trackingEvent))

    return response
  }
}
