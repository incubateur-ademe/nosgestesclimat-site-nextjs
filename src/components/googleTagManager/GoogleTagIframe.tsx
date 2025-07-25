'use client'

import { CookieConsentKey } from '@/types/cookies'
import { useCookieConsent } from '../cookies/CookieConsentProvider'

export function GoogleTagIframe() {
  const { cookieConsent, cookieCustomChoice } = useCookieConsent()

  const hasConsent =
    cookieConsent === 'all' || cookieCustomChoice?.[CookieConsentKey.googleAds]

  if (!hasConsent) {
    return null
  }

  return (
    <noscript>
      <iframe
        id="google-tag-iframe"
        title="google-tag-iframe"
        src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GOOGLE_TAG_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  )
}
