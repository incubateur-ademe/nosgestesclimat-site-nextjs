import { useUser } from '@/publicodes-state'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useDataServer } from './useDataServer'
import { useLocale } from './useLocale'

type Props = {
  lang?: string
  region?: string
}

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
      // When we work locally on the model we want the rules to be updated as much as possible (on window focus and every second)
      refetchOnWindowFocus: process.env.NEXT_PUBLIC_LOCAL_DATA_SERVER
        ? true
        : false,
      refetchInterval: process.env.NEXT_PUBLIC_LOCAL_DATA_SERVER ? 1000 : false,
      refetchIntervalInBackground: true,
    }
  )
}
