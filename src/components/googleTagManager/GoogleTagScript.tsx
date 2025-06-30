'use client'

import {
  COOKIE_CONSENT_KEY,
  COOKIE_CUSTOM_CHOICE_KEY,
} from '@/constants/state/cookies'
import { CookieChoice, CookieConsentKey } from '@/types/cookies'
import { safeLocalStorage } from '@/utils/browser/safeLocalStorage'
import Script from 'next/script'
import { useEffect, useState } from 'react'

export function GoogleTagScript() {
  const [hasConsent, setHasConsent] = useState(false)

  useEffect(() => {
    const checkConsent = () => {
      const consentFromStorage = safeLocalStorage.getItem(COOKIE_CONSENT_KEY)

      if (consentFromStorage === CookieChoice.all) {
        setHasConsent(true)
        return
      }

      if (consentFromStorage === CookieChoice.custom) {
        const customChoiceFromStorage = safeLocalStorage.getItem(
          COOKIE_CUSTOM_CHOICE_KEY
        )

        if (customChoiceFromStorage) {
          try {
            const choices = JSON.parse(customChoiceFromStorage)

            if (choices[CookieConsentKey.googleAds]) {
              setHasConsent(true)
              return
            }
          } catch (e) {
            console.error('Error parsing custom choices:', e)
          }
        }
      }

      setHasConsent(false)
    }

    const handleConsentChange = () => {
      checkConsent()
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === COOKIE_CONSENT_KEY || e.key === COOKIE_CUSTOM_CHOICE_KEY) {
        checkConsent()
      }
    }

    window.addEventListener(
      'cookieConsentChanged',
      handleConsentChange as EventListener
    )

    window.addEventListener('storage', handleStorageChange)

    checkConsent()

    return () => {
      window.removeEventListener(
        'cookieConsentChanged',
        handleConsentChange as EventListener
      )
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

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
