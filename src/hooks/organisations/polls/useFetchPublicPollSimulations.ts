import { ORGANISATION_URL } from '@/constants/urls/main'
import type { PublicPollSimulation } from '@/types/organisations'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { useUser } from '../../../publicodes-state'

export const useFetchPublicPollSimulations = (
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
    queryKey: ['organisations', userId, 'polls', pollIdOrSlug, 'simulations'],
    queryFn: () =>
      axios
        .get<PublicPollSimulation[]>(
          `${ORGANISATION_URL}/${userId}/public-polls/${pollIdOrSlug}/simulations`,
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data),
    enabled: !!pollIdOrSlug && options.enabled,
  })
}
