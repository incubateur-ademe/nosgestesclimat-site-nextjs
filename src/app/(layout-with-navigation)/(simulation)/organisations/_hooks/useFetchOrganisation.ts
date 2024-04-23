import { SERVER_URL } from '@/constants/urls'
import { useUser } from '@/publicodes-state'
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

  const { user } = useUser()

  const orgaSlug = slug ?? user?.organisation?.slug

  return useQuery({
    queryKey: ['organisation-validate-jwt', email, orgaSlug],
    queryFn: () =>
      axios
        .post(
          `${SERVER_URL}/organisations/fetch-organisation`,
          {
            email,
            slug: orgaSlug,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data),
    retry: false,
  })
}
