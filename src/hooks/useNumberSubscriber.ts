import { keepPreviousData, useQuery } from '@tanstack/react-query'
import axios from 'axios'

// TODO: endpoint should not be static (and should point to local if available)
export function useNumberSubscribers(): {
  data: number | undefined
} {
  return useQuery({
    queryKey: ['number subscribers'],
    queryFn: () =>
      axios
        .get('/api/get-newsletter-subscribers-number')
        .then((res) => res.data as string),
    placeholderData: keepPreviousData,
  })
}
