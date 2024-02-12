import { SERVER_URL } from '@/constants/urls'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function useFetchOrganization({ email }: { email: string }) {
  return useQuery({
    queryKey: ['organization-validate-jwt'],
    queryFn: () =>
      axios
        .post(
          `${SERVER_URL}/organizations/fetch-organization`,
          {
            email,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data),
    enabled: !!email,
    retry: false,
  })
}
