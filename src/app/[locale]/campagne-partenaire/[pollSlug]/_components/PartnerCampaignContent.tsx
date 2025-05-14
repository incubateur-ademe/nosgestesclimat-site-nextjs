'use client'

import type { PartnerCampaignType } from '@/adapters/cmsClient'
import { useFetchPublicPoll } from '@/hooks/organisations/polls/useFetchPublicPoll'
import PartnerCampaignHeader from './PartnerCampaignHeader'

export default function PartnerCampaignContent({
  pollSlug,
  partnerCampaign,
}: {
  pollSlug: string
  partnerCampaign: PartnerCampaignType
}) {
  console.log(partnerCampaign)
  const { data: pollInfo } = useFetchPublicPoll({
    pollIdOrSlug: pollSlug,
  })

  return (
    <>
      <PartnerCampaignHeader logoSrc={partnerCampaign.logo.url} />
    </>
  )
}
