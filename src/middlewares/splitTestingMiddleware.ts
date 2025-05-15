import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import googleBots from './excludedIPs/googlebot.json'
import specialCrawlers from './excludedIPs/special-crawlers.json'
import userTriggeredFetchers from './excludedIPs/user-triggered-fetchers.json'

const redirectUrl = `https://nosgestesclimat-site-preprod-pr${process.env.NEXT_PUBLIC_SPLIT_TESTING_PR_NUMBER}.osc-fr1.scalingo.io`

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
  console.log('splitTestingMiddleware - called')

  if (!process.env.NEXT_PUBLIC_SPLIT_TESTING_PR_NUMBER) {
    console.log(
      'splitTestingMiddleware - !process.env.NEXT_PUBLIC_SPLIT_TESTING_BRANCH'
    )
    return NextResponse.next()
  }
  // This has become useless
  const ip = '127.0.0.1' // request.ip

  if (!ip || !isIPv4(ip) || isGoogleBot(ip)) {
    console.log('splitTestingMiddleware - other if')
    return NextResponse.next()
  }

  const lastNumber = Number(ip.split('.').pop())

  const shouldRedirectToChallenger =
    Number(lastNumber / 255) <
    Number(process.env.NEXT_PUBLIC_SPLIT_TESTING_PERCENTAGE ?? 0.5)

  console.log(
    'splitTestingMiddleware - shouldRedirectToChallenger',
    shouldRedirectToChallenger
  )

  if (!shouldRedirectToChallenger || redirectUrl === request.nextUrl.origin) {
    const response = NextResponse.next()
    console.log(
      'splitTestingMiddleware - !shouldRedirectToChallenger || redirectUrl === request.nextUrl.origin',
      redirectUrl,
      request.nextUrl.origin
    )

    return response
  } else {
    const rewriteTo = `${redirectUrl}${request.nextUrl.href.replace(
      request.nextUrl.origin,
      ''
    )}`

    console.log('splitTestingMiddleware - rewriteTo', rewriteTo)

    const response = NextResponse.rewrite(rewriteTo)
    return response
  }
}

function isIPv4(ip: string) {
  const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}$/
  return ipv4Pattern.test(ip)
}
