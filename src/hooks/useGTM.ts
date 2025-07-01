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

    let retryCount = 0
    const maxRetries = 10

    // Check if GTM is loaded by looking for dataLayer
    const checkGTM = () => {
      if (
        typeof window !== 'undefined' &&
        window.dataLayer &&
        Array.isArray(window.dataLayer)
      ) {
        setIsGTMLoaded(true)
      } else {
        retryCount++
        if (retryCount <= maxRetries) {
          // Retry after a longer delay in case GTM is still loading
          setTimeout(checkGTM, 500)
        }
      }
    }

    // Initial check
    checkGTM()

    // Also check after a longer delay to ensure GTM has time to load
    const timeoutId = setTimeout(() => {
      if (
        typeof window !== 'undefined' &&
        window.dataLayer &&
        Array.isArray(window.dataLayer)
      ) {
        setIsGTMLoaded(true)
      }
    }, 3000)

    return () => clearTimeout(timeoutId)
  }, [hasConsent])

  return {
    isGTMAvailable: hasConsent && isGTMLoaded,
    hasConsent,
    isGTMLoaded,
  }
}
