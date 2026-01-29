import { getPosthogEnabledFromStorage } from '@/helpers/cookies/cookieConsentStorage'
import { useEffect, useState } from 'react'

/**
 * Hook to track whether Posthog is globally disabled via the privacy policy checkbox.
 * This is shared between CookieConsentManagement and useManagePosthogTracking.
 */
export function useIsPosthogDisabled() {
  const [isPosthogEnabled, setIsPosthogEnabled] = useState(() =>
    getPosthogEnabledFromStorage()
  )

  // Listen for the politique-de-confidentialite checkbox change event
  useEffect(() => {
    const handleEnabledChange = () => {
      setIsPosthogEnabled(getPosthogEnabledFromStorage())
    }

    window.addEventListener('posthog-enabled-change', handleEnabledChange)

    return () => {
      window.removeEventListener('posthog-enabled-change', handleEnabledChange)
    }
  }, [])

  return !isPosthogEnabled
}
