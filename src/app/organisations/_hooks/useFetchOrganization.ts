import { SERVER_URL } from '@/constants/urls'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function useFetchOrganization(slug: string) {
  return useQuery({
    queryKey: ['organization'],
    queryFn: () =>
      axios.get(`${SERVER_URL}/organizations/${slug}`).then((res) => res.data),
    enabled: !!slug,
  })
}
