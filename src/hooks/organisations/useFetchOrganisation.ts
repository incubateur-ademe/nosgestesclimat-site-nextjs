import { ORGANISATION_URL } from '@/constants/urls'
import { useUser } from '@/publicodes-state'
import type { Organisation } from '@/types/organisations'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useParams } from 'next/navigation'

export default function useFetchOrganisation() {
  const { orgaSlug: orgaSlugParam } = useParams()

  const { user } = useUser()

  const orgaSlug = orgaSlugParam ?? user?.organisation?.slug

  return useQuery({
    queryKey: ['organisations', orgaSlug],
    queryFn: () =>
      axios
        .get<Organisation>(`${ORGANISATION_URL}/${orgaSlugParam}`, {
          withCredentials: true,
        })
        .then((res) => res.data),
    retry: false,
    enabled: !!orgaSlugParam,
  })
}
