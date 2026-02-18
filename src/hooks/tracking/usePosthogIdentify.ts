'use client'

import { useCookieManagement } from '@/components/cookies/useCookieManagement'
import posthog from 'posthog-js'
import { useEffect } from 'react'

export function usePosthogIdentify({ userId }: { userId: string }) {
  const { cookieState } = useCookieManagement()
  useEffect(() => {
    if (!userId || cookieState.posthog !== 'accepted') {
      return
    }

    posthog.identify(userId)
  }, [cookieState.posthog, userId])
}
