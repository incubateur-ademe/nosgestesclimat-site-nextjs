import { fetchPolls } from '@/helpers/organisations/fetchPolls'
import { useQuery } from '@tanstack/react-query'

type Props = {
  pollSlugs?: (string | null | undefined)[]
}
export const usePolls = ({ pollSlugs }: Props) => {
  return useQuery({
    queryKey: ['polls', pollSlugs],
    queryFn: () => fetchPolls({ pollSlugs }),
    enabled: pollSlugs?.length ? true : false,
  })
}
