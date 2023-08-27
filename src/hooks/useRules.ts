import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

type Props = {
  lang: string
  region: string
}
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
