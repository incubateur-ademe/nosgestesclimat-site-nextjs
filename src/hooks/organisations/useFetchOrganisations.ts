import { ORGANISATION_URL } from '@/constants/urls/main'
import type { Organisation } from '@/types/organisations'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function useFetchOrganisations({
  enabled = true,
}: { enabled?: boolean } = {}) {
  return useQuery({
    queryKey: ['organisations'],
    queryFn: () =>
      axios
        .get<Organisation[]>(ORGANISATION_URL, {
          withCredentials: true,
        })
        .then((res) => res.data),
    enabled,
  })
}
