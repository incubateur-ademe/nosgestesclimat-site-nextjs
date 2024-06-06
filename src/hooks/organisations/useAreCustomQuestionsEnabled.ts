import { SERVER_URL } from '@/constants/urls'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useParams } from 'next/navigation'

export function useAreCustomQuestionsEnabled() {
  const { orgaSlug } = useParams()

  return useQuery({
    queryKey: ['areCustomQuestionsEnabled', orgaSlug],
    queryFn: () =>
      axios
        .get(`${SERVER_URL}/polls/check-custom-questions-enabled/${orgaSlug}`)
        .then((res) => res.data),
    retry: false,
    enabled: !!orgaSlug,
  })
}
