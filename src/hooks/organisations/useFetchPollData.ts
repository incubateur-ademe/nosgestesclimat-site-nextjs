import { SERVER_URL } from '@/constants/urls'
import { useUser } from '@/publicodes-state'
import { PollData } from '@/types/organisations'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import axios from 'axios'

type Props = {
  orgaSlug?: string
}

export function useFetchPollData({ orgaSlug }: Props = {}): UseQueryResult<
  PollData | null,
  Error
> {
  const { user } = useUser()

  return useQuery({
    queryKey: ['pollData'],
    queryFn: () =>
      axios
        .post(SERVER_URL + '/organisations/fetch-poll-processed-data', {
          orgaSlug,
          email: user?.email,
          userId: user?.userId,
        })
        .then((res) => res.data)
        .catch((err) => {
          console.error(err)
          return null
        }),
    enabled: !!orgaSlug,
    refetchInterval: 30000,
  })
}
