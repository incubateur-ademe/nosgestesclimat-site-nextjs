'use client'

import type { PartnerCampaignType } from '@/adapters/cmsClient'
import { useFetchPublicPoll } from '@/hooks/organisations/polls/useFetchPublicPoll'

export default function PartnerCampaignContent({
  pollSlug,
  partnerCampaign,
}: {
  pollSlug: string
  partnerCampaign: PartnerCampaignType
}) {
  const { data: pollInfo } = useFetchPublicPoll({
    pollIdOrSlug: pollSlug,
  })

  return <div>PartnerCampaignContent</div>
}
