import { POSTHOG_ENABLED_KEY } from '@/constants/state/cookies'
import { safeLocalStorage } from '@/utils/browser/safeLocalStorage'
import { useEffect, useState } from 'react'

/**
 * Hook to track whether Posthog is globally disabled via the privacy policy checkbox.
 * This is shared between CookieConsentManagement and useManagePosthogTracking.
 */
export function useIsPosthogDisabled() {
  const [isPosthogDisabled, setIsPosthogDisabled] = useState(() => {
    const storedValue = safeLocalStorage.getItem(POSTHOG_ENABLED_KEY)
    return storedValue === 'false'
  })

  // Listen for the politique-de-confidentialite checkbox change event
  useEffect(() => {
    const handleEnabledChange = () => {
      const storedValue = safeLocalStorage.getItem(POSTHOG_ENABLED_KEY)
      setIsPosthogDisabled(storedValue === 'false')
    }

    window.addEventListener('posthog-enabled-change', handleEnabledChange)

    return () => {
      window.removeEventListener('posthog-enabled-change', handleEnabledChange)
    }
  }, [])

  return isPosthogDisabled
}
