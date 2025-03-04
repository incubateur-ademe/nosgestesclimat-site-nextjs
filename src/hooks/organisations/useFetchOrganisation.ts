import { ORGANISATION_URL } from '@/constants/urls'
import type { Organisation } from '@/types/organisations'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useParams } from 'next/navigation'

export default function useFetchOrganisation() {
  const param = useParams<{orgaSlug: string}>()
  const orgaSlug = param?.orgaSlug 

  return useQuery({
    queryKey: ['organisations', orgaSlug],
    queryFn: () =>
      axios
        .get<Organisation>(`${ORGANISATION_URL}/${orgaSlug}`, {
          withCredentials: true,
        })
        .then((res) => res.data),
    retry: false,
    enabled: !!orgaSlug,
  })
}
