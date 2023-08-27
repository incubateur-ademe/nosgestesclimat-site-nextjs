import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

type Props = {
  language: string
  region: string
}
export function useRules({ language, region }: Props) {
  return useQuery(
    ['rules', language, region],
    () =>
      axios
        .get(
          `https://data.nosgestesclimat.fr/co2-model.${region}-lang.${language}-opti.json`
        )
        .then((res) => res.data),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  )
}
