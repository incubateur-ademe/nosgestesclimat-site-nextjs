import { fetchPoll } from '@/helpers/organisations/fetchPoll'
import { useQuery } from '@tanstack/react-query'

type Props = {
  pollSlug?: string | null
  isEnabled?: boolean
}
export const usePoll = ({ pollSlug, isEnabled = true }: Props) => {
  return useQuery({
    queryKey: ['poll', pollSlug],
    queryFn: () => fetchPoll({ pollSlug }),
    enabled: pollSlug && isEnabled ? true : false,
  })
}
