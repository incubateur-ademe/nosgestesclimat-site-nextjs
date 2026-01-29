import { useCookieConsent } from '@/components/cookies/CookieConsentProvider'
import { POSTHOG_ENABLED_KEY } from '@/constants/state/cookies'
import { deleteCookiesWithPrefix } from '@/helpers/tracking/deleteCookiesWithPrefix'
import { useUser } from '@/publicodes-state'
import { CookieChoice, CookieConsentKey } from '@/types/cookies'
import { safeLocalStorage } from '@/utils/browser/safeLocalStorage'
import posthog from 'posthog-js'
import { useEffect, useState } from 'react'

declare global {
  interface Window {
    posthog: typeof posthog
  }
}

export function useManagePosthogTracking() {
  const { cookieConsent, cookieCustomChoice } = useCookieConsent()
  const { user } = useUser()

  const [isPosthogDisabled, setIsPosthogDisabled] = useState(() => {
    const storedValue = safeLocalStorage.getItem(POSTHOG_ENABLED_KEY)
    return storedValue !== 'true'
  })

  const hasConsent =
    cookieConsent === CookieChoice.all ||
    cookieCustomChoice?.[CookieConsentKey.posthog]

  // Listen for the politique-de-confidentialite checkbox change event
  useEffect(() => {
    const handleEnabledChange = () => {
      const storedValue = safeLocalStorage.getItem(POSTHOG_ENABLED_KEY)
      setIsPosthogDisabled(storedValue !== 'true')
    }

    window.addEventListener('posthog-enabled-change', handleEnabledChange)

    return () => {
      window.removeEventListener('posthog-enabled-change', handleEnabledChange)
    }
  }, [])

  // Init Posthog
  useEffect(() => {
    if (
      !process.env.NEXT_PUBLIC_POSTHOG_KEY ||
      isPosthogDisabled ||
      !posthog.is_capturing()
    )
      return

    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      person_profiles: 'identified_only',
      autocapture: false,
      capture_pageview: false,
      capture_pageleave: true,
      custom_campaign_params: [
        'mtm_campaign',
        'mtm_kwd',
        'mtm_keyword',
        'organisation',
        'poll',
      ],
    })

    // Expose posthog globally for inline scripts
    if (typeof window !== 'undefined') {
      window.posthog = posthog
    }
  }, [isPosthogDisabled])

  // Handle opt-out/opt-in
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return

    if (isPosthogDisabled) {
      posthog.opt_out_capturing()
      posthog.reset()
      deleteCookiesWithPrefix('ph_')
    } else if (posthog.has_opted_out_capturing()) {
      posthog.opt_in_capturing()
    }
  }, [isPosthogDisabled])

  // Handle user identification
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY || isPosthogDisabled) return

    if (hasConsent) {
      // Identify user - full tracking enabled
      posthog.identify(user?.userId)
    } else {
      // Reset - anonymous tracking
      posthog.reset()
    }
  }, [hasConsent, isPosthogDisabled, user?.userId])
}
