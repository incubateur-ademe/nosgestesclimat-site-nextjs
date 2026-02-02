'use client'

import {
  trackingCookiesAccept,
  trackingCookiesCustomChoice,
  trackingCookiesRefuse,
} from '@/constants/tracking/misc'
import {
  getCookieConsentFromStorage,
  setCookieConsentInStorage,
} from '@/helpers/cookies/cookieConsentStorage'
import { CookieChoice } from '@/types/cookies'
import { trackEvent } from '@/utils/analytics/trackEvent'
import { useState } from 'react'
import Trans from '../translation/trans/TransClient'
import CookieConsentBanner from './CookieConsentBanner'
import CookieConsentManagement from './CookieConsentManagement'
import { useCookieConsent } from './CookieConsentProvider'
import type { CookieState } from './useCookieManagement'
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

  const { state, onChange, bannerDisplayState, setBannerDisplayState } =
    useCookieManagement()

  const confirmChoices = (choices: CookieState) => {
    onChange(choices)

    // setConsent(CookieChoice.custom)
    // setCookieCustomChoiceInStorage(choices)

    setIsBoardOpen(false)
    setIsVisible(false)

    // triggerConsentDetection()

    // trackEvent(trackingCookiesCustomChoiceSave)
  }

  return (
    <>
      <CookieConsentBanner
        isBoardOpen={isBoardOpen}
        isVisible={bannerDisplayState === 'banner'}
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
        defaultChoices={state}
        confirmChoices={confirmChoices}
      />

      <button
        data-testid="cookie-footer-button"
        className="text-primary-700 focus:ring-primary-700 text-xs underline focus:ring-2 focus:ring-offset-3 focus:outline-hidden"
        onClick={() => setIsBoardOpen(true)}>
        <Trans i18nKey="cookies.management.openSettings">
          Gestion des cookies
        </Trans>
      </button>
    </>
  )
}
