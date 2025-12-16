'use client'

import type { BannerType } from '@/adapters/cmsClient'
import type { Locale } from '@/i18nConfig'
import { fetchBanner } from '@/services/cms/fetchBanner'
import { useEffect, useState } from 'react'
import { BannerContent } from './BannerContent'

export default function Banner({ locale }: { locale: Locale }) {
  const [banner, setBanner] = useState<BannerType | null>(null)

  useEffect(() => {
    const fetchBannerData = async () => {
      const banner = await fetchBanner(locale)
      setBanner(banner)
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchBannerData()
  }, [locale])

  if (!banner) return null

  return <BannerContent banner={banner} />
}
