import { useUser } from '@/publicodes-state'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useDataServer } from './useDataServer'
import { useLocale } from './useLocale'

type Props = {
  lang?: string
  region?: string
}
// TODO: endpoint should not be static (and should point to local if available)
export function useRules({ lang, region }: Props) {
  const locale = useLocale()
  const { user } = useUser()
  const dataServer = useDataServer()

  return useQuery(
    ['rules', lang, region],
    () =>
      axios
        .get(
          `${dataServer}/co2-model.${user?.region?.code || region}-lang.${
            locale || lang
          }-opti.json`
        )
        .then((res) => res.data as unknown),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: process.env.NODE_ENV === 'development',
    }
  )
}
