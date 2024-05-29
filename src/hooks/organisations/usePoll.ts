import { SERVER_URL } from '@/constants/urls'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

type Props = {
  pollSlug: string | null
  isEnabled?: boolean
  orgaSlug: string
  email: string
}
export const usePoll = ({
  pollSlug,
  orgaSlug,
  email,
  isEnabled = true,
}: Props) => {
  return useQuery({
    queryKey: ['poll', pollSlug],
    queryFn: () =>
      axios
        .get(
          `${SERVER_URL}/polls/fetch-poll/${pollSlug}?email=${encodeURIComponent(email)}&orgaSlug=${encodeURIComponent(orgaSlug)}`
        )
        .then((res) => res.data),
    enabled: pollSlug && orgaSlug && email && isEnabled ? true : false,
  })
}
