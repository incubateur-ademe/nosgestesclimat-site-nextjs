import { SERVER_URL } from '@/constants/urls'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useGetOrgaPollSlugs(orgaSlug: string, enabled: boolean) {
  return useQuery({
    queryKey: ['orgaPollSlugs'],
    queryFn: () =>
      axios
        .get(`${SERVER_URL}/organisations/get-orga-poll-slugs/${orgaSlug}`)
        .then((res) => res.data),
    enabled,
  })
}
