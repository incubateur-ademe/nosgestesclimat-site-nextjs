import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useGetSupportedRegions() {
  return useQuery({
    queryKey: ['regions'],
    queryFn: () =>
      axios
        .get('https://data.nosgestesclimat.fr/supportedRegions.json')
        .then((res) => res.data),
  })
}
