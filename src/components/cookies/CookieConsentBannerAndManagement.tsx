'use client'

import {
  COOKIE_CONSENT_KEY,
  COOKIE_CUSTOM_CHOICE_KEY,
} from '@/constants/state/cookies'
import { CookieChoice, type CookieConsentChoices } from '@/types/cookies'
import { safeLocalStorage } from '@/utils/browser/safeLocalStorage'
import { useEffect, useState } from 'react'
import CookieConsentBanner from './CookieConsentBanner'
import CookieConsentManagement from './CookieConsentManagement'
import { useCookieConsent } from './CookieConsentProvider'

export default function CookieConsentBannerAndManagement() {
  const [isVisible, setIsVisible] = useState(false)
  const [isBoardOpen, setIsBoardOpen] = useState(false)

  const { triggerConsentDetection } = useCookieConsent()

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
  }

  const refuseAll = () => {
    setConsent(CookieChoice.refuse)
    setIsVisible(false)
    setIsBoardOpen(false)
  }

  const openSettings = () => {
    setIsBoardOpen(true)
  }

  const closeSettings = () => {
    setIsBoardOpen(false)
    setIsVisible(true)
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
