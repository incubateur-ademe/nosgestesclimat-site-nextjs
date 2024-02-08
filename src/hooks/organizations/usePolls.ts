import { fetchPoll } from '@/helpers/organizations/fetchPoll'
import { useQuery } from '@tanstack/react-query'

export const usePolls = (id: string | null) => {
  return useQuery({
    queryKey: ['poll', id],
    queryFn: () => fetchPoll(id),
    enabled: !!id,
  })
}
