import { fetchHasUserAlreadyParticipated } from '@/helpers/organisations/fetchHasUserAlreadyParticipated'
import { useQuery } from '@tanstack/react-query'

type Props = {
  pollSlug: string
  userId: string
  email?: string
}

export function useCheckIfUserHasAlreadyParticipated({
  pollSlug,
  userId,
  email,
}: Props) {
  return useQuery({
    queryKey: ['checkIfUserHasAlreadyParticipated', pollSlug, userId],
    queryFn: () =>
      fetchHasUserAlreadyParticipated({ pollSlug, userId, email: email || '' }),
    enabled: !!pollSlug && !!userId,
  })
}
