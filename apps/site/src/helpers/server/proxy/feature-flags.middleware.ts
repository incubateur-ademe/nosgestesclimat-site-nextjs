import { getCookieOptions } from '@/helpers/server/cookie/helpers'
import { FF_COOKIE_NAME } from '@/services/feature-flags/constants'
import {
  parseFeatureFlagCookie,
  parseFeatureFlagParams,
  stripFeatureFlagParams,
} from '@/services/feature-flags/urlParams'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import type { MiddlewareResult } from './types'

export function middlewareFeatureFlags(request: NextRequest): MiddlewareResult {
  const incoming = parseFeatureFlagParams(request.nextUrl.searchParams)
  if (!incoming) return { redirect: null, cookies: [] }

  const existing = parseFeatureFlagCookie(
    request.cookies.get(FF_COOKIE_NAME)?.value
  )
  const merged = { ...existing, ...incoming }

  const response = NextResponse.redirect(
    stripFeatureFlagParams(request.nextUrl)
  )
  response.cookies.set(FF_COOKIE_NAME, JSON.stringify(merged), {
    ...getCookieOptions(),
    // Client components resolve flags through `useFeatureFlag`, which reads
    // this override from `document.cookie`, so it must stay readable by JS.
    httpOnly: false,
    sameSite: 'lax',
    partitioned: false, // Partitioned does not work with SameSite=Lax
  })
  return { redirect: response, cookies: [] }
}
