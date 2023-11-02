import { useUser } from '@/publicodes-state'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useDataServer } from './useDataServer'
import { useLocale } from './useLocale'

type Props = {
  lang?: string
  region?: string
  isOptim?: boolean
}

export function useRules({ lang, region, isOptim = true }: Props) {
  const dataServer = useDataServer()

  const locale = useLocale()

  const { user } = useUser()

  const regionCode =
    user?.region?.code != undefined && user?.region?.code !== ''
      ? user?.region?.code
      : region

  return useQuery({
    queryKey: ['rules', dataServer, lang, region, isOptim],
    queryFn: () =>
      axios
        .get(
          `${dataServer}/co2-model.${regionCode}-lang.${
            // TODO: The model should be "en" and not "en-us"
            locale === 'en' ? 'en-us' : locale
          }${isOptim ? '-opti' : ''}.json`
        )
        .then((res) => res.data as unknown),

    placeholderData: keepPreviousData,
  })
}
