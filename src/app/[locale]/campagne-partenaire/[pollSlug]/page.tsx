export default async function PartnerCampaignPage({
  params,
}: {
  params: Promise<{ pollSlug: string }>
}) {
  const { pollSlug } = await params

  return <></>
}
