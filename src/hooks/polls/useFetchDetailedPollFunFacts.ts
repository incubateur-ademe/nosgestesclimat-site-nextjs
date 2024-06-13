import { SERVER_URL } from '@/constants/urls'
import { useUser } from '@/publicodes-state'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

type Props = {
  orgaSlug?: string
  pollSlug?: string
  enabled?: boolean
}

export function useFetchDetailedPollFunFacts({
  orgaSlug,
  pollSlug,
  enabled = true,
}: Props = {}) {
  const { user } = useUser()

  return useQuery({
    queryKey: ['pollDetailedFunFacts', orgaSlug, pollSlug],
    queryFn: () =>
      axios
        .get(
          `${SERVER_URL}/polls/fetch-poll-detailed-statistics?orgaSlug=${encodeURIComponent(orgaSlug ?? '')}&pollSlug=${encodeURIComponent(pollSlug ?? '')}&email=${encodeURIComponent(user?.organisation?.administratorEmail ?? '')}&userId=${encodeURIComponent(user?.userId)}`
        )
        .then((res) => res.data)
        .catch((err) => {
          console.error(err)
          return null
        }),
    enabled: !!orgaSlug && enabled && !!user?.userId,
    refetchInterval: 30000,
  })
}
