'use client'

import {
  trackingCookiesAccept,
  trackingCookiesCustomChoice,
  trackingCookiesCustomChoiceSave,
  trackingCookiesRefuse,
} from '@/constants/tracking/misc'
import {
  getCookieConsentFromStorage,
  setCookieConsentInStorage,
  setCookieCustomChoiceInStorage,
} from '@/helpers/cookies/cookieConsentStorage'
import { CookieChoice, type CookieConsentChoices } from '@/types/cookies'
import { trackEvent } from '@/utils/analytics/trackEvent'
import { useState } from 'react'
import CookieConsentBanner from './CookieConsentBanner'
import CookieConsentManagement from './CookieConsentManagement'
import { useCookieConsent } from './CookieConsentProvider'
import { useCookieManagement } from './useCookieManagement'

export default function CookieConsentBannerAndManagement() {
  const [isVisible, setIsVisible] = useState(() => {
    const hasConsent = getCookieConsentFromStorage()
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
    setCookieConsentInStorage(consent)

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

  const { state, onChange } = useCookieManagement()

  const confirmChoices = (choices: CookieConsentChoices) => {
    onChange({
      posthog: choices.posthog ? 'accepted' : 'refused',
      googleAds: choices.googleAds ? 'accepted' : 'refused',
    })

    setConsent(CookieChoice.custom)
    setCookieCustomChoiceInStorage(choices)

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
