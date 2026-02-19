import { captureLocale } from '@/constants/tracking/posthogTrackers'
import type { Locale } from '@/i18nConfig'
import { trackPosthogEvent } from '@/utils/analytics/trackEvent'
import { useEffect } from 'react'

export function useTrackLocale({ locale }: { locale: Locale }) {
  useEffect(() => {
    trackPosthogEvent(captureLocale({ locale }))
  }, [locale])
}
