'use client'

import posthog from 'posthog-js'
import { useEffect } from 'react'

export function usePosthogIdentify({ userId }: { userId: string }) {
  useEffect(() => {
    if (!userId) {
      return
    }

    posthog.identify(userId)
  }, [userId])
}
