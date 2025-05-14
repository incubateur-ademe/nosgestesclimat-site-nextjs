import type { PartnerCampaignType } from '@/adapters/cmsClient'
import { cmsClient } from '@/adapters/cmsClient'
import i18nConfig, { type Locale } from '@/i18nConfig'
import { captureException } from '@sentry/nextjs'

export async function fetchPartnerCampaign({
  locale,
  pollSlug,
}: {
  locale: Locale
  pollSlug: string
}): Promise<PartnerCampaignType | null> {
  try {
    const partnerCampaignSearchParams = new URLSearchParams({
      locale: locale ?? i18nConfig.defaultLocale,
      'filters[pollSlug][$eq]': pollSlug,
      'populate[0]': 'logo',
      'populate[1]': 'image',
    })

    const partnerCampaignsResponse = await cmsClient<{
      data: PartnerCampaignType[]
    }>(`/api/partner-campaigns?${partnerCampaignSearchParams}`)

    return partnerCampaignsResponse.data[0]
  } catch (error) {
    captureException(error)

    return null
  }
}
