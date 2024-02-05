import { fetchPoll } from '@/helpers/organisations/fetchPoll'
import { useQuery } from '@tanstack/react-query'

export const usePoll = (id: string | null) => {
  return useQuery({
    queryKey: ['poll', id],
    queryFn: () => fetchPoll(id),
    enabled: !!id,
  })
}
