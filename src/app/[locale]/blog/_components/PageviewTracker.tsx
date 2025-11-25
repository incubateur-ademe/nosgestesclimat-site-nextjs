'use client'

import { useTrackPageView } from '@/hooks/tracking/useTrackPageView'

export function PageviewTracker() {
  useTrackPageView()

  return null
}
