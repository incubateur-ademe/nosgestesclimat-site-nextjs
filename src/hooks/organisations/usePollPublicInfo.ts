import { fetchPublicPollInfo } from '@/helpers/organisations/fetchPoll'
import { useQuery } from '@tanstack/react-query'

type Props = {
  pollSlug?: string | null
  isEnabled?: boolean
}
export const usePollPublicInfo = ({ pollSlug, isEnabled = true }: Props) => {
  return useQuery({
    queryKey: ['poll', pollSlug],
    queryFn: () => fetchPublicPollInfo({ pollSlug }),
    enabled: pollSlug && isEnabled ? true : false,
  })
}
