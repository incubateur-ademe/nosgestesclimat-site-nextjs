import { SERVER_URL } from '@/constants/urls'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type Props = {
  pollSlug: string
  orgaSlug: string
  email: string
}

export function useDeletePoll({ pollSlug, orgaSlug, email }: Props) {
  return useMutation({
    mutationKey: ['deletePoll', pollSlug],
    mutationFn: () =>
      axios
        .delete(
          `${SERVER_URL}/polls/delete/${pollSlug}?email=${encodeURIComponent(email)}&orgaSlug=${encodeURIComponent(orgaSlug)}`
        )
        .then((res) => res.data),
  })
}
