import Partners from '@/components/landing-pages/Partners'
import type { Locale } from '@/i18nConfig'
import { fetchPartnerCampaign } from '@/services/cms/fetchPartnerCampaign'
import { redirect } from 'next/navigation'
import PartnerCampaignContent from './_components/PartnerCampaignContent'

export default async function PartnerCampaignPage({
  params,
}: {
  params: Promise<{ pollSlug: string; locale: Locale }>
}) {
  const { locale, pollSlug } = await params

  const partnerCampaign = await fetchPartnerCampaign({
    locale,
    pollSlug,
  })

  if (!partnerCampaign) {
    redirect('/404')
  }

  return (
    <PartnerCampaignContent
      pollSlug={pollSlug}
      partnerCampaign={partnerCampaign}
      partnersComponent={<Partners locale={locale} />}
    />
  )
}
