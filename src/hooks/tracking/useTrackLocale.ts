import { trackingLocale } from '@/constants/tracking/misc'
import type { Locale } from '@/i18nConfig'
import { trackEvent } from '@/utils/analytics/trackEvent'
import posthog from 'posthog-js'
import { useEffect } from 'react'

export function useTrackLocale({ locale }: { locale: Locale }) {
  useEffect(() => {
    trackEvent(trackingLocale(locale))
    posthog.register_for_session({
      locale,
    })
  }, [locale])
}
