'use client'

import {
  COOKIE_CONSENT_KEY,
  COOKIE_CUSTOM_CHOICE_KEY,
} from '@/constants/state/cookies'
import {
  trackingCookiesAccept,
  trackingCookiesCustomChoice,
  trackingCookiesCustomChoiceSave,
  trackingCookiesRefuse,
} from '@/constants/tracking/misc'
import { CookieChoice, type CookieConsentChoices } from '@/types/cookies'
import { trackEvent } from '@/utils/analytics/trackEvent'
import { safeLocalStorage } from '@/utils/browser/safeLocalStorage'
import { useState } from 'react'
import CookieConsentBanner from './CookieConsentBanner'
import CookieConsentManagement from './CookieConsentManagement'
import { useCookieConsent } from './CookieConsentProvider'

export default function CookieConsentBannerAndManagement() {
  const [isVisible, setIsVisible] = useState(() => {
    const hasConsent = safeLocalStorage.getItem(COOKIE_CONSENT_KEY)
    return !hasConsent
  })

  const {
    triggerConsentDetection,
    isBoardOpen,
    setIsBoardOpen,
    cookieConsent,
    cookieCustomChoice,
  } = useCookieConsent()

  const setConsent = (consent: CookieChoice) =>
    safeLocalStorage.setItem(COOKIE_CONSENT_KEY, consent)

  const acceptAll = () => {
    setConsent(CookieChoice.all)
    setIsVisible(false)
    setIsBoardOpen(false)

    triggerConsentDetection()

    trackEvent(trackingCookiesAccept)
  }

  const refuseAll = () => {
    setConsent(CookieChoice.refuse)
    setIsVisible(false)
    setIsBoardOpen(false)

    trackEvent(trackingCookiesRefuse)
  }

  const openSettings = () => {
    setIsBoardOpen(true)
    trackEvent(trackingCookiesCustomChoice)
  }

  const closeSettings = () => {
    setIsBoardOpen(false)

    if (!cookieConsent && !cookieCustomChoice) {
      setIsVisible(true)
    }
  }

  const confirmChoices = (choices: CookieConsentChoices) => {
    setConsent(CookieChoice.custom)
    safeLocalStorage.setItem(
      COOKIE_CUSTOM_CHOICE_KEY,
      JSON.stringify({ ...choices })
    )

    setIsBoardOpen(false)
    setIsVisible(false)

    triggerConsentDetection()

    trackEvent(trackingCookiesCustomChoiceSave)
  }

  return (
    <>
      <CookieConsentBanner
        isBoardOpen={isBoardOpen}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        openSettings={openSettings}
        refuseAll={refuseAll}
        acceptAll={acceptAll}
      />

      <CookieConsentManagement
        isBoardOpen={isBoardOpen}
        closeSettings={closeSettings}
        refuseAll={refuseAll}
        acceptAll={acceptAll}
        confirmChoices={confirmChoices}
        choices={cookieCustomChoice}
      />
    </>
  )
}
