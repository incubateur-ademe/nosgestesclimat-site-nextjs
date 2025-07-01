'use client'

import { CookieConsentKey } from '@/types/cookies'
import Script from 'next/script'
import { useCookieConsent } from '../cookies/CookieConsentProvider'

export function GoogleTagScript() {
  const { cookieConsent, cookieCustomChoice } = useCookieConsent()

  const hasConsent =
    cookieConsent === 'all' || cookieCustomChoice?.[CookieConsentKey.googleAds]

  if (!hasConsent) {
    return null
  }

  return (
    <Script id="google-ads-script" type="text/javascript">
      {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-PVK9L8MK');
      `}
    </Script>
  )
}
