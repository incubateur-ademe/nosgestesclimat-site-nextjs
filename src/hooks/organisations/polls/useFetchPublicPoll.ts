import { ORGANISATION_URL } from '@/constants/urls'
import type { PublicOrganisationPoll } from '@/types/organisations'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useParams, useSearchParams } from 'next/navigation'
import { useUser } from '../../../publicodes-state'

export const useFetchPublicPoll = ({
  pollIdOrSlug,
  enabled = true,
}: {
  pollIdOrSlug?: string | string[] | null | undefined
  enabled?: boolean
} = {}) => {
  const params = useParams()
  const searchParams = useSearchParams()

  if (!pollIdOrSlug) {
    pollIdOrSlug = params?.pollSlug
  }

  if (!pollIdOrSlug) {
    pollIdOrSlug = searchParams?.get('poll')
  }

  const {
    user: { userId },
  } = useUser()

  return useQuery({
    queryKey: ['organisations', userId, 'polls', pollIdOrSlug],
    queryFn: () =>
      axios
        .get<PublicOrganisationPoll>(
          `${ORGANISATION_URL}/${userId}/public-polls/${pollIdOrSlug}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data),
    enabled: !!pollIdOrSlug && enabled,
  })
}
