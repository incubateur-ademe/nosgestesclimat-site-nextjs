import { useCookieConsent } from '@/components/cookies/CookieConsentProvider'
import { deleteCookiesWithPrefix } from '@/helpers/tracking/deleteCookiesWithPrefix'
import { CookieChoice, CookieConsentKey } from '@/types/cookies'
import { useEffect } from 'react'

export function useManageGoogleTracking() {
  const { cookieConsent, cookieCustomChoice } = useCookieConsent()

  useEffect(() => {
    // Delete Google Tag cookies upon refusal
    if (
      cookieConsent === CookieChoice.refuse ||
      cookieCustomChoice?.[CookieConsentKey.googleAds] === false
    ) {
      deleteCookiesWithPrefix('_gcl')
    }
  }, [cookieConsent, cookieCustomChoice])
}
