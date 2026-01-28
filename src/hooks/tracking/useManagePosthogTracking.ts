import { useCookieConsent } from '@/components/cookies/CookieConsentProvider'
import { POSTHOG_ENABLED_KEY } from '@/constants/state/cookies'
import { useUser } from '@/publicodes-state'
import { CookieConsentKey } from '@/types/cookies'
import { safeLocalStorage } from '@/utils/browser/safeLocalStorage'
import posthog from 'posthog-js'
import { useCallback, useEffect, useState } from 'react'

declare global {
  interface Window {
    posthog: typeof posthog
  }
}

export function useManagePosthogTracking() {
  const { cookieConsent, cookieCustomChoice } = useCookieConsent()
  const { user } = useUser()

  const [isPosthogDisabled, setIsPosthogDisabled] = useState(false)

  const hasConsent =
    cookieConsent === 'all' || cookieCustomChoice?.[CookieConsentKey.posthog]

  const checkPosthogDisabled = useCallback(() => {
    const storedValue = safeLocalStorage.getItem(POSTHOG_ENABLED_KEY)
    setIsPosthogDisabled(storedValue !== 'true')
  }, [])

  useEffect(() => {
    checkPosthogDisabled()

    const handleEnabledChange = () => {
      checkPosthogDisabled()
    }

    window.addEventListener('posthog-enabled-change', handleEnabledChange)

    return () => {
      window.removeEventListener('posthog-enabled-change', handleEnabledChange)
    }
  }, [checkPosthogDisabled])

  useEffect(() => {
    if (isPosthogDisabled) return

    if (hasConsent) {
      console.log('identifying user', user?.userId)
      posthog.identify(user?.userId)
    } else {
      posthog.reset()
    }
  }, [hasConsent, isPosthogDisabled, user?.userId])

  useEffect(() => {
    if (
      !process.env.NEXT_PUBLIC_POSTHOG_KEY ||
      isPosthogDisabled ||
      !posthog.is_capturing()
    )
      return

    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
      autocapture: false, // Disable automatic event capture, as we capture manually
      capture_pageview: false, // Disable automatic pageview capture, as we capture manually
      capture_pageleave: true, // Enable pageleave capture
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

  // Gestion des 3 niveaux de tracking
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return

    // Niveau 3 : Désactivation complète (checkbox cochée)
    if (isPosthogDisabled) {
      posthog.opt_out_capturing()
      posthog.reset()

      // Supprimer tous les cookies Posthog (préfixés par "ph_")
      if (typeof document !== 'undefined') {
        document.cookie.split(';').forEach((cookie) => {
          const cookieName = cookie.split('=')[0].trim()
          if (cookieName.startsWith('ph_')) {
            // Supprimer le cookie avec différentes combinaisons de path/domain
            const hostname = window.location.hostname
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${hostname}`
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${hostname}`
          }
        })
      }
      return
    }

    // Réactiver le capturing si on était opt-out
    if (posthog.has_opted_out_capturing()) {
      posthog.opt_in_capturing()
    }

    // Niveau 1 : Activation complète avec userId
    if (hasConsent) {
      console.log('identifying user', user?.userId)
      posthog.identify(user?.userId)
    } else {
      // Niveau 2 : Mode exempté (tracking sans identification)
      // reset() réinitialise l'identité mais le tracking continue
      posthog.reset()
    }
  }, [hasConsent, isPosthogDisabled, user?.userId])
}
