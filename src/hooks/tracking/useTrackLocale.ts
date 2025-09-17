import { trackingLocale } from '@/constants/tracking/misc'
import { captureLocale } from '@/constants/tracking/posthogTrackers'
import { trackEvent, trackPosthogEvent } from '@/utils/analytics/trackEvent'
import { useEffect } from 'react'
import { useLocale } from '../useLocale'

export function useTrackLocale() {
  const locale = useLocale()

  useEffect(() => {
    trackEvent(trackingLocale(locale))
    trackPosthogEvent(captureLocale({ locale }))
  }, [locale])
}
