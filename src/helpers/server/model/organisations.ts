'use server'
import { ORGANISATION_URL } from '@/constants/urls/main'
import type { Organisation, OrganisationPoll } from '@/types/organisations'
import { captureException } from '@sentry/nextjs'
import { fetchServer } from './fetchServer'
import { getAuthUser } from './user'

export async function getOrganisationPolls(
  idOrSlug: string
): Promise<OrganisationPoll[]> {
  return fetchServer<OrganisationPoll[]>(
    `${ORGANISATION_URL}/${idOrSlug}/polls`
  )
}

export async function getUserOrganisation(): Promise<Organisation | undefined> {
  const user = await getAuthUser()

  if (!user) {
    return undefined
  }

  try {
    const organisations = await fetchServer<Organisation[]>(ORGANISATION_URL)

    if (organisations.length === 0) return undefined

    return organisations[0]
  } catch (error) {
    captureException(error)
    return undefined
  }
}
