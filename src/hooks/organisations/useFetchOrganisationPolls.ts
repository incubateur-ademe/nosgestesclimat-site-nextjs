import { ORGANISATION_URL } from '@/constants/urls'
import type { PollInfo } from '@/types/organisations'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useFetchOrganisationPolls(
  organisationIdOrSlug: string,
  enabled: boolean
) {
  return useQuery({
    queryKey: ['organisations', organisationIdOrSlug, 'polls'],
    queryFn: () =>
      axios
        .get<PollInfo[]>(`${ORGANISATION_URL}/${organisationIdOrSlug}/polls`)
        .then((res) => res.data),
    enabled,
  })
}
