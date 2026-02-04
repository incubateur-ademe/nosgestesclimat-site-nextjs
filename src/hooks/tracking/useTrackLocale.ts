import { trackLocale } from '@/constants/tracking/misc'
import type { Locale } from '@/i18nConfig'
import { useEffect } from 'react'

export function useTrackLocale({ locale }: { locale: Locale }) {
  useEffect(() => {
    trackLocale(locale)
  }, [locale])
}
