import { SERVER_URL } from '@/constants/urls'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

type Props = {
  pollSlug: string
  userId: string
}

export function useCheckIfUserHasAlreadyParticipated({
  pollSlug,
  userId,
}: Props) {
  return useQuery({
    queryKey: ['checkIfUserHasAlreadyParticipated', pollSlug, userId],
    queryFn: () =>
      axios
        .post(`${SERVER_URL}/organisations/verify-user-participation`, {
          pollSlug,
          userId,
        })
        .then((res) => res.data),
    enabled: !!pollSlug && !!userId,
  })
}
