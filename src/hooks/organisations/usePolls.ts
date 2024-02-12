import { fetchPolls } from '@/helpers/organisations/fetchPolls'
import { useQuery } from '@tanstack/react-query'

type Props = {
  pollsSlug?: (string | undefined)[]
}
export const usePolls = ({ pollsSlug }: Props) => {
  return useQuery({
    queryKey: ['polls', pollsSlug],
    queryFn: () => fetchPolls({ pollsSlug }),
    enabled: pollsSlug ? true : false,
  })
}
