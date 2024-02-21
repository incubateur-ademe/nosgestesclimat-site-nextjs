import { SERVER_URL } from '@/constants/urls'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function useFetchOrganisation({ email }: { email: string }) {
  return useQuery({
    queryKey: ['organisation-validate-jwt', email, Math.random()],
    queryFn: () =>
      axios
        .post(
          `${SERVER_URL}/organisations/fetch-organisation`,
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
