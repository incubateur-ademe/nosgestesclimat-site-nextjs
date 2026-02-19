import { fetchPoll } from '@/helpers/server/model/organisations'
import type { Organisation } from '@/types/organisations'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

export const useFetchPoll = (organisation?: Organisation) => {
  const { pollSlug: pollIdOrSlug } = useParams()

  return useQuery({
    queryKey: ['organisations', organisation?.slug, 'polls', pollIdOrSlug],
    queryFn: () =>
      fetchPoll({
        organisationId: organisation?.id ?? '',
        pollId: (pollIdOrSlug as string | undefined) ?? '',
      }),
    enabled: !!pollIdOrSlug && !!organisation,
  })
}
