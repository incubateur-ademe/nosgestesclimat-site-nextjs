'use client'

import CookieConsentBanner from './CookieConsentBanner'
import CookieConsentForm from './CookieConsentForm'
import type { CookieState } from './useCookieManagement'
import { useCookieManagement } from './useCookieManagement'

export default function CookieConsentBannerAndManagement() {
  const {
    cookieState,
    cookieStateJson,
    onChange,
    cookieBannerDisplayState,
    setCookieBannerDisplayState,
    rejectAll,
    acceptAll,
  } = useCookieManagement()

  const confirmChoices = (choices: CookieState) => {
    onChange(choices)
  }

  return (
    <>
      {cookieBannerDisplayState === 'banner' ? (
        <CookieConsentBanner
          onOpenForm={() => setCookieBannerDisplayState('form')}
          rejectAll={rejectAll}
          acceptAll={acceptAll}
        />
      ) : cookieBannerDisplayState === 'form' ? (
        <CookieConsentForm
          onCancel={() =>
            setCookieBannerDisplayState(!cookieStateJson ? 'banner' : 'hidden')
          }
          rejectAll={rejectAll}
          acceptAll={acceptAll}
          defaultChoices={cookieState}
          confirmChoices={confirmChoices}
        />
      ) : null}
    </>
  )
}
