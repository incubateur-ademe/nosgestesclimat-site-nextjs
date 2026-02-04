'use client'

import { safeLocalStorage } from '@/utils/browser/safeLocalStorage'
import CookieConsentBanner from './CookieConsentBanner'
import CookieConsentForm from './CookieConsentForm'
import type { CookieState } from './useCookieManagement'
import { COOKIE_STATE_KEY, useCookieManagement } from './useCookieManagement'

export default function CookieConsent() {
  const {
    cookieState,
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
            setCookieBannerDisplayState(
              !safeLocalStorage.getItem(COOKIE_STATE_KEY) ? 'banner' : 'hidden'
            )
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
