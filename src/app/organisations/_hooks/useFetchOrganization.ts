import { SERVER_URL } from '@/constants/urls'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function useFetchOrganization({
  ownerEmail,
}: {
  ownerEmail: string
}) {
  return useQuery({
    queryKey: ['organization-validate-jwt'],
    queryFn: () =>
      axios
        .post(
          `${SERVER_URL}/organizations/validate-jwt`,
          {
            ownerEmail,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => response.data),
    enabled: !!ownerEmail,
  })
}
