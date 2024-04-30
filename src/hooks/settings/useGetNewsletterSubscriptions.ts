import { SERVER_URL } from '@/constants/urls'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useGetNewsletterSubscriptions(email: string) {
  return useQuery({
    queryKey: ['getNewsletterSubscriptions', email],
    queryFn: async () =>
      axios
        .get(
          `${SERVER_URL}/get-newsletter-subscriptions?email=${encodeURIComponent(email)}`
        )
        .then((res) => res.data),
    enabled: !!email,
    retry: false,
  })
}
