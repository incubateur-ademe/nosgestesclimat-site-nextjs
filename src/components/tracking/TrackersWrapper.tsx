'use client'

import type { Locale } from '@/i18nConfig'
import dynamic from 'next/dynamic'

const Trackers = dynamic(() => import('./Trackers'), {
  ssr: false,
})

export default function TrackersWrapper({ locale }: { locale: Locale }) {
  return <Trackers locale={locale} />
}
