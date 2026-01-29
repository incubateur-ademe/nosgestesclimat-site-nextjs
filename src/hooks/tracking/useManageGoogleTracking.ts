import { deleteCookiesWithPrefix } from '@/helpers/tracking/deleteCookiesWithPrefix'
import type { CookieConsentChoices } from '@/types/cookies'
import { CookieChoice, CookieConsentKey } from '@/types/cookies'
import { safeLocalStorage } from '@/utils/browser/safeLocalStorage'
import { useEffect, useRef } from 'react'

export function useManageGoogleTracking({
  cookieConsent,
  cookieCustomChoice,
}: {
  cookieConsent?: CookieChoice
  cookieCustomChoice?: CookieConsentChoices
}) {
  const hasConsent =
    cookieConsent === CookieChoice.all ||
    cookieCustomChoice?.[CookieConsentKey.googleAds] === true

  const hasRefused =
    cookieConsent === CookieChoice.refuse ||
    cookieCustomChoice?.[CookieConsentKey.googleAds] === false

  const hadPreviouslyRefusedRef = useRef(false)

  useEffect(() => {
    if (hasConsent) {
      window.gtag?.('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
      })

      // Google doesn't automatically re-set cookies after consent update
      if (hadPreviouslyRefusedRef.current) {
        hadPreviouslyRefusedRef.current = false
        window.location.reload()
        return
      }
    } else if (hasRefused) {
      // Revoke consent and delete cookies
      window.gtag?.('consent', 'update', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      })

      deleteCookiesWithPrefix('_gcl')
      safeLocalStorage.removeItem('_gcl_ls')

      // Mark that consent was refused
      hadPreviouslyRefusedRef.current = true
    }
  }, [hasConsent, hasRefused])
}
