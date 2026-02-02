'use client'

import CookieConsentBanner from './CookieConsentBanner'
import CookieConsentForm from './CookieConsentManagement'
import type { CookieState } from './useCookieManagement'
import { useCookieManagement } from './useCookieManagement'

export default function CookieConsentBannerAndManagement() {
  const {
    state,
    onChange,
    bannerDisplayState,
    setBannerDisplayState,
    rejectAll,
    acceptAll,
  } = useCookieManagement()

  const confirmChoices = (choices: CookieState) => {
    onChange(choices)
  }

  return (
    <>
      {bannerDisplayState === 'banner' ? (
        <CookieConsentBanner
          onClose={() => setBannerDisplayState('hidden')}
          onOpenForm={() => setBannerDisplayState('form')}
          rejectAll={rejectAll}
          acceptAll={acceptAll}
        />
      ) : bannerDisplayState === 'form' ? (
        <CookieConsentForm
          onClose={() => setBannerDisplayState('banner')}
          rejectAll={rejectAll}
          acceptAll={acceptAll}
          defaultChoices={state}
          confirmChoices={confirmChoices}
        />
      ) : null}
    </>
  )
}
