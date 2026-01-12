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
import { useEffect, useState } from 'react'
import CookieConsentBanner from './CookieConsentBanner'
import CookieConsentManagement from './CookieConsentManagement'
import { useCookieConsent } from './CookieConsentProvider'

export default function CookieConsentBannerAndManagement() {
  const [isVisible, setIsVisible] = useState(false)

  const {
    triggerConsentDetection,
    isBoardOpen,
    setIsBoardOpen,
    cookieConsent,
    cookieCustomChoice,
  } = useCookieConsent()

  useEffect(() => {
    const hasConsent = safeLocalStorage.getItem(COOKIE_CONSENT_KEY)

    if (!hasConsent) {
      setIsVisible(true)
    }
  }, [])

  const setConsent = (consent: CookieChoice) =>
    safeLocalStorage.setItem(COOKIE_CONSENT_KEY, consent)

  const acceptAll = () => {
    setConsent(CookieChoice.all)
    setIsVisible(false)
    setIsBoardOpen(false)

    triggerConsentDetection()

    const tracking = trackingCookiesAccept()
    trackEvent(tracking.matomo, tracking.posthog)
  }

  const refuseAll = () => {
    setConsent(CookieChoice.refuse)
    setIsVisible(false)
    setIsBoardOpen(false)

    const tracking = trackingCookiesRefuse()
    trackEvent(tracking.matomo, tracking.posthog)
  }

  const openSettings = () => {
    setIsBoardOpen(true)
    const tracking = trackingCookiesCustomChoice()
    trackEvent(tracking.matomo, tracking.posthog)
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

    const tracking = trackingCookiesCustomChoiceSave()
    trackEvent(tracking.matomo, tracking.posthog)
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
      />
    </>
  )
}
