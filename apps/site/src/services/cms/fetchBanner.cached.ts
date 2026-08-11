import type { BannerType } from '@/adapters/cmsClient'
import { type Locale } from '@/i18nConfig'
import { cacheLife } from 'next/cache'
import { fetchBanner as fetchBannerUncached } from './fetchBanner'

// Production-only wrapper: 'use cache' keeps the banner out of the CMS for up
// to an hour. Preprod and preview apps use the uncached version so CMS edits
// appear immediately.
export async function fetchBanner(locale: Locale): Promise<BannerType | null> {
  'use cache'
  cacheLife('hours')

  return await fetchBannerUncached(locale)
}
