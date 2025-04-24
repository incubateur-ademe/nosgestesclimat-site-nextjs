import type { PartnerType } from '@/adapters/cmsClient'
import { cmsClient } from '@/adapters/cmsClient'
import i18nConfig from '@/i18nConfig'
import { captureException } from '@sentry/nextjs'

type Props = {
  displayOnLandingPage?: boolean
}

export async function fetchPartners(props?: Props): Promise<PartnerType[]> {
  const { displayOnLandingPage } = props || {}

  try {
    const partnersSearchParams = new URLSearchParams({
      locale: i18nConfig.defaultLocale,
      sort: 'displayOrder',
      populate: 'category',
      ...(displayOnLandingPage
        ? { 'filters[displayOnLandingPage][$eq]': 'true' }
        : {}),
      'pagination[limit]': '100',
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
