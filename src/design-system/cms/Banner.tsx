import type { Locale } from '@/i18nConfig'
import { fetchBanner } from '@/services/cms/fetchBanner'
import { connection } from 'next/server'
import { BannerContent } from './BannerContent'

export default async function Banner({ locale }: { locale: Locale }) {
  await connection()

  const banner = await fetchBanner(locale)

  if (!banner) return null

  return <BannerContent banner={banner} />
}
