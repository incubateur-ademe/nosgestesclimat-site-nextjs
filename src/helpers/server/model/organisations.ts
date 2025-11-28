import { ORGANISATION_URL } from '@/constants/urls/main'
import type { Organisation, OrganisationPoll } from '@/types/organisations'
import { fetchWithJWTCookie } from './fetchWithJWTCookie'

export function getOrganisation(idOrSlug: string): Promise<Organisation> {
  return fetchWithJWTCookie(`${ORGANISATION_URL}/${idOrSlug}`)
}

export function getOrganisationPolls(
  idOrSlug: string
): Promise<OrganisationPoll[]> {
  return fetchWithJWTCookie(`${ORGANISATION_URL}/${idOrSlug}/polls`)
}

export async function getUserCurrentOrganisation(): Promise<
  Organisation | undefined
> {
  const organisations = await fetchWithJWTCookie(ORGANISATION_URL)
  if (organisations.length === 0) return undefined
  return organisations[0]
}
