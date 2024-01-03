import { SERVER_URL } from '@/constants/urls'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function useFetchOrganization({
  slug,
  ownerEmail,
}: {
  slug: string
  ownerEmail: string
}) {
  return useQuery({
    queryKey: ['organization', slug, ownerEmail],
    queryFn: () =>
      axios
        .post(
          `${SERVER_URL}/organizations/fetch-organization/${slug}`,
          {
            ownerEmail,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data),
    enabled: !!slug && !!ownerEmail,
  })
}
