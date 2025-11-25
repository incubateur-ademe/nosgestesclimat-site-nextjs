import { trackingLocale } from '@/constants/tracking/misc'
import { captureLocale } from '@/constants/tracking/posthogTrackers'
import type { Locale } from '@/i18nConfig'
import { trackEvent, trackPosthogEvent } from '@/utils/analytics/trackEvent'
import { useEffect } from 'react'

export function useTrackLocale({ locale }: { locale: Locale }) {
  useEffect(() => {
    trackEvent(trackingLocale(locale))
    trackPosthogEvent(captureLocale({ locale }))
  }, [locale])
}
