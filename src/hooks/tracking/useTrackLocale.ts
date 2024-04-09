import { trackingLocale } from '@/constants/tracking/misc'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useEffect } from 'react'
import { useLocale } from '../useLocale'

export function useTrackLocale() {
  const locale = useLocale()

  useEffect(() => {
    trackEvent(trackingLocale(locale))
  }, [locale])
}
