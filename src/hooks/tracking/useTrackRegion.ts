import { trackingRegion } from '@/constants/tracking/misc'
import { captureRegion } from '@/constants/tracking/posthogTrackers'
import { useUser } from '@/publicodes-state'
import { trackEvent, trackPosthogEvent } from '@/utils/analytics/trackEvent'
import { useEffect } from 'react'

export function useTrackRegion() {
  const { user } = useUser()

  const { region } = user

  useEffect(() => {
    const regionCode = region?.code || 'FR'
    trackEvent(trackingRegion(regionCode))
    trackPosthogEvent(captureRegion({ region: regionCode }))
  }, [region])
}
