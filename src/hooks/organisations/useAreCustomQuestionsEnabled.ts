import { SERVER_URL } from '@/constants/urls'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useParams } from 'next/navigation'

export function useAreCustomQuestionsEnabled() {
  const params = useParams()
  const orgaSlug = params?.orgaSlug as string

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
