import type { PartnerType } from '@/adapters/cmsClient'
import { cmsClient } from '@/adapters/cmsClient'
import i18nConfig from '@/i18nConfig'
import { captureException } from '@sentry/nextjs'

export async function fetchPartners(): Promise<PartnerType[]> {
  try {
    const partnersSearchParams = new URLSearchParams({
      locale: i18nConfig.defaultLocale,
      sort: 'displayOrder',
      populate: 'category',
    })

    const partnersResponse = await cmsClient<{ data: PartnerType[] }>(
      `/api/partners?${partnersSearchParams}`
    )

    return partnersResponse.data
  } catch (error) {
    captureException(error)

    return []
  }
}
