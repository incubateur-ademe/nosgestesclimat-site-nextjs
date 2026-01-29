'use client'

import { useClientTranslation } from '@/hooks/useClientTranslation'
import { CookieChoice, CookieConsentKey } from '@/types/cookies'
import { useCookieConsent } from '../cookies/CookieConsentProvider'

export function GoogleTagIframe() {
  const { t } = useClientTranslation()
  const { cookieConsent, cookieCustomChoice } = useCookieConsent()

  const hasConsent =
    cookieConsent === CookieChoice.all ||
    cookieCustomChoice?.[CookieConsentKey.googleAds]

  if (!hasConsent) {
    return null
  }

  return (
    <noscript>
      <iframe
        id="google-tag-iframe"
        title={t('Iframe - Google Tag Manager')}
        src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GOOGLE_TAG_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  )
}
