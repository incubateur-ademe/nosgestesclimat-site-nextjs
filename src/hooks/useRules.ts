import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

type Props = {
  lang: string
  region: string
}
// TODO: endpoint should not be static (and should point to local if available)
export function useRules({ lang, region }: Props) {
  return useQuery(
    ['rules', lang, region],
    () =>
      axios
        .get(
          `https://data.nosgestesclimat.fr/co2-model.${region}-lang.${lang}-opti.json`
        )
        .then((res) => res.data),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  )
}
