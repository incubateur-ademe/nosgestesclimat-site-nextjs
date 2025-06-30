'use client'

import { useCookieConsent } from '../cookies/CookieConsentProvider'

export function GoogleTagIframe() {
  const { cookieConsent, cookieCustomChoice } = useCookieConsent()

  const hasConsent =
    cookieConsent === 'all' || (cookieCustomChoice as any)?.['googleAds']

  if (!hasConsent) {
    return null
  }

  return (
    <noscript>
      <iframe
        title="google-tag-iframe"
        src="https://www.googletagmanager.com/ns.html?id=GTM-PVK9L8MK"
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  )
}
