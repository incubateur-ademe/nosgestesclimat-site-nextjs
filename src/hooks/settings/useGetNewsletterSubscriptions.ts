import { USER_URL } from '@/constants/urls/main'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useGetNewsletterSubscriptions(userId: string) {
  return useQuery<number[]>({
    queryKey: ['getNewsletterSubscriptions', userId],
    queryFn: () =>
      axios.get(`${USER_URL}/${userId}/contact`).then((res) => {
        return res.data?.listIds ?? []
      }),
    enabled: !!userId,
    retry: false,
    placeholderData: [],
  })
}
