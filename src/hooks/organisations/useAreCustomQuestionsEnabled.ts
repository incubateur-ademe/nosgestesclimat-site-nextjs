import { SERVER_URL } from '@/constants/urls'
import { Organisation } from '@/types/organisations'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useAreCustomQuestionsEnabled(
  organisation: Organisation | undefined
) {
  return useQuery({
    queryKey: ['areCustomQuestionsEnabled', organisation],
    queryFn: () =>
      axios
        .post(`${SERVER_URL}/organisations/check-custom-questions-enabled`, {
          slug: organisation?.slug,
        })
        .then((res) => res.data),
    retry: false,
    enabled: !!organisation,
  })
}
