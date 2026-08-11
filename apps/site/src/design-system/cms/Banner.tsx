import type { Locale } from '@/i18nConfig'
import { fetchBanner as fetchBannerCached } from '@/services/cms/fetchBanner.cached'
import { fetchBanner as fetchBannerUncached } from '@/services/cms/fetchBanner'
import { APP_ENV } from '../../../config/app-env'
import { BannerContent } from './BannerContent'

// Production-only 'use cache': preprod and preview apps read the banner live so
// CMS changes appear immediately instead of after the cache expires.
const fetchBanner =
  APP_ENV === 'production' ? fetchBannerCached : fetchBannerUncached

export default async function Banner({ locale }: { locale: Locale }) {
  const banner = await fetchBanner(locale)

  if (!banner) return null

  return <BannerContent banner={banner} />
}
