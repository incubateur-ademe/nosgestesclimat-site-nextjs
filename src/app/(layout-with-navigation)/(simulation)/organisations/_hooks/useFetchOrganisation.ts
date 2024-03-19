import { SERVER_URL } from '@/constants/urls'
import { Organisation } from '@/types/organisations'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useParams } from 'next/navigation'

export default function useFetchOrganisation({
  email,
}: {
  email: string
}): UseQueryResult<Organisation> {
  const { slug } = useParams()

  return useQuery({
    queryKey: ['organisation-validate-jwt', email, slug],
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
