import type { BannerType } from '@/adapters/cmsClient'
import { cmsClient } from '@/adapters/cmsClient'
import i18nConfig from '@/i18nConfig'
import { captureException } from '@sentry/nextjs'

const isProduction = process.env.NODE_ENV === 'production'

export async function fetchBanner(): Promise<BannerType | null> {
  try {
    const bannerSearchParams = new URLSearchParams({
      locale: i18nConfig.defaultLocale,
      sort: 'startDate:desc',
      ...(isProduction ? { status: 'published' } : { status: 'draft' }),
      populate: '*',
    })

    const bannersResponse = await cmsClient<{ data: BannerType[] }>(
      `/api/banners?${bannerSearchParams}`
    )

    return bannersResponse.data[0]
  } catch (error) {
    console.error('Error:', error)
    captureException(error)

    return null
  }
}
