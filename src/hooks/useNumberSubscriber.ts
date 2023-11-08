import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useNumberSubscribers(): {
  data: number | undefined
} {
  return useQuery(
    ['number subscribers'],
    () =>
      axios
        .get('/api/get-newsletter-subscribers-number')
        .then((res) => res.data as string),
    {
      keepPreviousData: true,
    }
  )
}
