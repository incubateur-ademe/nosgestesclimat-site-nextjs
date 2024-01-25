import { SERVER_URL } from '@/constants/urls'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function useFetchOrganization({
  administratorEmail,
}: {
  administratorEmail: string
}) {
  return useQuery({
    queryKey: ['organization-validate-jwt'],
    queryFn: () =>
      axios
        .post(
          `${SERVER_URL}/organizations/fetch-organization`,
          {
            administratorEmail,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => response.data),
    enabled: !!administratorEmail,
  })
}
