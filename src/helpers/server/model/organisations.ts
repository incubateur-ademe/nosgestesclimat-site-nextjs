import { ORGANISATION_URL } from '@/constants/urls/main'
import type { Organisation, OrganisationPoll } from '@/types/organisations'
import { captureException } from '@sentry/nextjs'
import { fetchWithJWTCookie } from './fetchWithJWTCookie'
import { getUser } from './user'

export function getOrganisation(idOrSlug: string): Promise<Organisation> {
  return fetchWithJWTCookie(`${ORGANISATION_URL}/${idOrSlug}`)
}

export function getOrganisationPolls(
  idOrSlug: string
): Promise<OrganisationPoll[]> {
  return fetchWithJWTCookie(`${ORGANISATION_URL}/${idOrSlug}/polls`)
}

export async function getUserOrganisation(): Promise<Organisation | undefined> {
  const user = await getUser()

  if (!user) {
    return undefined
  }

  try {
    const organisations = await fetchWithJWTCookie(ORGANISATION_URL)

    if (organisations.length === 0) return undefined

    return organisations[0]
  } catch (error) {
    captureException(error)
    return undefined
  }
}
