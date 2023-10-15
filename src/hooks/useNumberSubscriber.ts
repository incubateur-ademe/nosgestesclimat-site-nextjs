import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// TODO: endpoint should not be static (and should point to local if available)
export function useNumberSubscribers() {
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
