import PartnerCampaignContent from './_components/PartnerCampaignContent'

export default async function PartnerCampaignPage({
  params,
}: {
  params: Promise<{ pollSlug: string }>
}) {
  const { pollSlug } = await params

  return <PartnerCampaignContent pollSlug={pollSlug} />
}
