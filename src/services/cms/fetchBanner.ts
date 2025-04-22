import type { BannerType } from '@/adapters/cmsClient'
import { cmsClient } from '@/adapters/cmsClient'
import i18nConfig, { type Locale } from '@/i18nConfig'
import { captureException } from '@sentry/nextjs'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

// Ajout du plugin UTC
dayjs.extend(utc)

// Limit to the allowed locales fr and en, the only locales supported by the CMS
const allowedLocales = [i18nConfig.locales[0], i18nConfig.locales[1]]

export async function fetchBanner(locale: Locale): Promise<BannerType | null> {
  try {
    const now = dayjs.utc()
    const startOfDay = now.startOf('day').toISOString()
    const endOfDay = now.endOf('day').toISOString()

    // Log des dates pour le débogage
    console.log('Debug dates:', {
      startOfDay,
      endOfDay,
      currentTime: now.toISOString(),
    })

    const bannerSearchParams = new URLSearchParams({
      locale: allowedLocales.includes(locale)
        ? locale
        : // Display english banner if locale is not allowed (currently applies for es)
          i18nConfig.locales[1],
      sort: 'startDate:desc',
      // Get the banner for the current date ; the date needs to be between the start and end date
      'filters[$and][0][startDate][$lte]': endOfDay,
      'filters[$and][1][endDate][$gte]': startOfDay,
      populate: '*',
    })

    // Log de l'URL complète pour le débogage
    console.log('Debug URL:', `/api/banners?${bannerSearchParams.toString()}`)

    const bannersResponse = await cmsClient<{ data: BannerType[] }>(
      `/api/banners?${bannerSearchParams}`
    )

    return bannersResponse.data[0]
  } catch (error) {
    captureException(error)

    return null
  }
}
