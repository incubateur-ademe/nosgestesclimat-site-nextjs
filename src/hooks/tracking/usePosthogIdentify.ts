'use client'

import { useCookieManagement } from '@/components/cookies/useCookieManagement'
import { useUser } from '@/publicodes-state'
import posthog from 'posthog-js'
import { useEffect } from 'react'

export function usePosthogIdentify() {
  const { cookieState } = useCookieManagement()
  const { user } = useUser()

  const hasPosthogConsent = cookieState.posthog === 'accepted'
  const userId = user.userId

  useEffect(() => {
    if (!hasPosthogConsent || !userId) {
      return
    }

    posthog.identify(userId)
  }, [hasPosthogConsent, userId])
}
