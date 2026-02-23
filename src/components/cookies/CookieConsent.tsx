'use client'

import CookieConsentBanner from './CookieConsentBanner'
import CookieConsentForm from './CookieConsentForm'
import { IS_COOKIE_STATE_INITIALIZED } from './cookieLocalStorage'
import { useCookieManagement } from './useCookieManagement'

export default function CookieConsent() {
  const {
    cookieState,
    onChange,
    cookieBannerDisplayState,
    setCookieBannerDisplayState,
    rejectAll,
    acceptAll,
  } = useCookieManagement()

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
            setCookieBannerDisplayState(
              IS_COOKIE_STATE_INITIALIZED ? 'hidden' : 'banner'
            )
          }
          rejectAll={rejectAll}
          acceptAll={acceptAll}
          defaultChoices={cookieState}
          confirmChoices={onChange}
        />
      ) : null}
    </>
  )
}
