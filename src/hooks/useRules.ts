import { useUser } from '@/publicodes-state'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useDataServer } from './useDataServer'
import { useLocale } from './useLocale'

type Props = {
  lang?: string
  region?: string
  isOptim?: boolean
}

export function useRules({ lang, region, isOptim = true }: Props) {
  const locale = useLocale()
  const { user } = useUser()
  const dataServer = useDataServer()

  return useQuery(
    ['rules', lang, region],
    () =>
      axios
        .get(
          `${dataServer}/co2-model.${user?.region?.code || region}-lang.${
            // TODO: The model should be "en" and not "en-us"
            (locale === 'en' ? 'en-us' : locale) || lang
          }${isOptim ? '-opti' : ''}.json`
        )
        .then((res) => res.data as unknown),
    {
      keepPreviousData: true,
      // When we work locally on the model we want the rules to be updated as much as possible (on window focus and every 3 seconds)
      refetchOnWindowFocus: process.env.NEXT_PUBLIC_LOCAL_DATA_SERVER
        ? true
        : false,
      refetchInterval: process.env.NEXT_PUBLIC_LOCAL_DATA_SERVER ? 3000 : false,
    }
  )
}
