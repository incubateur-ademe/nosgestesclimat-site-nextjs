import { getOrganisation } from '@/helpers/server/model/organisations'
import PollForm from './_components/PollForm'

/* global PageProps */
export default async function CreerCampagnePage({
  params,
}: PageProps<'/[locale]/organisations/[orgaSlug]/creer-campagne'>) {
  const { orgaSlug } = await params
  const organisation = await getOrganisation(orgaSlug)!

  return <PollForm organisation={organisation} />
}
