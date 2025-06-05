import type { BannerType } from '@/adapters/cmsClient'
import { cmsClient } from '@/adapters/cmsClient'
import { getLocaleWithoutEs } from '@/helpers/language/getLocaleWithoutEs'
import i18nConfig, { type Locale } from '@/i18nConfig'
import { captureException } from '@sentry/nextjs'
import dayjs from 'dayjs'

// Limit to the allowed locales fr and en, the only locales supported by the CMS
const allowedLocales = [i18nConfig.locales[0], i18nConfig.locales[1]]

export async function fetchBanner(locale: Locale): Promise<BannerType | null> {
  try {
    const bannerSearchParams = new URLSearchParams({
      locale: getLocaleWithoutEs(locale),
      sort: 'startDate:desc',
      // Get the banner for the current date ; the date needs to be between the start and end date
      'filters[$and][0][startDate][$lte]': dayjs(new Date())
        .endOf('day')
        .toISOString(),
      'filters[$and][1][endDate][$gte]': dayjs(new Date())
        .startOf('day')
        .toISOString(),
      populate: '*',
    })

    const bannersResponse = await cmsClient<{ data: BannerType[] }>(
      `/api/banners?${bannerSearchParams}`
    )

    return bannersResponse.data[0]
  } catch (error) {
    captureException(error)

    return null
  }
}
