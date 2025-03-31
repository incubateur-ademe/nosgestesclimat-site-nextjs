import { ORGANISATION_URL } from '@/constants/urls'
import type { FunFacts } from '@incubateur-ademe/nosgestesclimat'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { useUser } from '../../../publicodes-state'

export const useFetchPublicPollDashboard = (
  options: {
    enabled?: boolean
  } = { enabled: true }
) => {
  const params = useParams()

  const pollIdOrSlug = params.pollSlug

  const {
    user: { userId },
  } = useUser()

  return useQuery({
    queryKey: ['organisations', userId, 'polls', pollIdOrSlug, 'dashboard'],
    queryFn: () =>
      axios
        .get<{ funFacts: FunFacts }>(
          `${ORGANISATION_URL}/${userId}/public-polls/${pollIdOrSlug}/dashboard`,
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data),
    enabled: !!pollIdOrSlug && options.enabled,
  })
}
