import { ORGANISATION_URL } from '@/constants/urls/main'
import type { Organisation, OrganisationPoll } from '@/types/organisations'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useParams } from 'next/navigation'

export function fetchPoll({
  organisationId,
  pollId,
}: {
  organisationId: string
  pollId: string
}) {
  if (!organisationId || !pollId) {
    throw new Error('Missing organisationId or pollId')
  }

  return axios
    .get<OrganisationPoll>(
      `${ORGANISATION_URL}/${organisationId}/polls/${pollId}`,
      {
        withCredentials: true,
      }
    )
    .then((res) => res.data)
}

export const useFetchPoll = (organisation?: Organisation) => {
  const { pollSlug: pollIdOrSlug } = useParams()

  return useQuery({
    queryKey: ['organisations', organisation?.slug, 'polls', pollIdOrSlug],
    queryFn: () =>
      fetchPoll({
        organisationId: organisation?.id ?? '',
        pollId: (pollIdOrSlug as string | undefined) ?? '',
      }),
    enabled: !!pollIdOrSlug && !!organisation,
  })
}
