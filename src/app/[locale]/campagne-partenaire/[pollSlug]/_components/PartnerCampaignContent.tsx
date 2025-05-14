'use client'

import { useFetchPublicPoll } from '@/hooks/organisations/polls/useFetchPublicPoll'

export default function PartnerCampaignContent({
  pollSlug,
}: {
  pollSlug: string
}) {
  const { data: pollInfo } = useFetchPublicPoll({
    pollIdOrSlug: pollSlug,
  })

  return <div>PartnerCampaignContent</div>
}
