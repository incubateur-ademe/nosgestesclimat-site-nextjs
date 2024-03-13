import { fetchPoll } from '@/helpers/organisations/fetchPoll'
import { useQuery } from '@tanstack/react-query'

type Props = {
  pollSlug?: string | null
}
export const usePoll = ({ pollSlug }: Props) => {
  return useQuery({
    queryKey: ['poll', pollSlug],
    queryFn: () => fetchPoll({ pollSlug }),
    enabled: pollSlug ? true : false,
  })
}
