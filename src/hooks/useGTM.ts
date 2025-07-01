import { useCookieConsent } from '@/components/cookies/CookieConsentProvider'
import { CookieConsentKey } from '@/types/cookies'
import { useEffect, useState } from 'react'

export const useGTM = () => {
  const { cookieConsent, cookieCustomChoice } = useCookieConsent()
  const [isGTMLoaded, setIsGTMLoaded] = useState(false)

  const hasConsent =
    cookieConsent === 'all' || cookieCustomChoice?.[CookieConsentKey.googleAds]

  useEffect(() => {
    if (!hasConsent) {
      setIsGTMLoaded(false)
      return
    }

    // Check if GTM is loaded by looking for dataLayer
    const checkGTM = () => {
      if (typeof window !== 'undefined' && window.dataLayer) {
        setIsGTMLoaded(true)
      } else {
        // Retry after a short delay in case GTM is still loading
        setTimeout(checkGTM, 100)
      }
    }

    checkGTM()
  }, [hasConsent])

  return {
    isGTMAvailable: hasConsent && isGTMLoaded,
    hasConsent,
    isGTMLoaded,
  }
}
