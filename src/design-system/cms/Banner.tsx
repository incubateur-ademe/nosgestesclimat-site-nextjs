'use client'

import type { Locale } from '@/i18nConfig'
import { fetchBanner } from '@/services/cms/fetchBanner'
import { use } from 'react'
import { BannerContent } from './BannerContent'

export default function Banner({ locale }: { locale: Locale }) {
  const banner = use(fetchBanner(locale))

  if (!banner) return null

  return <BannerContent banner={banner} />
}
