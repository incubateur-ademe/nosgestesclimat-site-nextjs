import { NGC_MODEL_API_URL, NGC_MODEL_API_URL_FALLBACK } from '@/constants/urls'
import importLocalRules from '@/helpers/importLocalRules'
import { useUser } from '@/publicodes-state'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useDataServer } from './useDataServer'
import { useLocale } from './useLocale'

type Props = {
  lang: string
  region: string
  isOptim?: boolean
}

function getURLToFetch(
  dataServer: string,
  locale: string,
  regionCode: string,
  isOptim: boolean
): string {
  return dataServer.startsWith(NGC_MODEL_API_URL)
    ? `${dataServer}/unknown/${locale}/${regionCode}/${
        isOptim ? 'optim-rules' : 'rules'
      }`
    : `${dataServer}/co2-model.${regionCode}-lang.${locale}${
        isOptim ? '-opti' : ''
      }.json`
}

export function useRules({ lang, region, isOptim = true }: Props) {
  const dataServer = useDataServer()
  const locale = useLocale()
  const { user } = useUser()

  const regionCode =
    user?.region?.code != undefined && user?.region?.code !== ''
      ? user?.region?.code
      : region

  const URLToFetch = getURLToFetch(dataServer, locale, regionCode, isOptim)

  return useQuery({
    queryKey: ['rules', dataServer, lang, region, isOptim],
    queryFn: async () => {
      if (process.env.NEXT_PUBLIC_LOCAL_DATA === 'nosgestesclimat') {
        return importLocalRules({ regionCode, locale, isOptim })
      }
      return axios
        .get(URLToFetch)
        .then(({ data }) => data)
        .catch((err) => {
          console.warn(`Failed to fetch rules from: ${URLToFetch}`, err.message)
          const fallbackURL = getURLToFetch(
            NGC_MODEL_API_URL_FALLBACK,
            locale,
            regionCode,
            isOptim
          )
          console.warn(`Falling back to: ${fallbackURL}`)
          return axios.get(fallbackURL).then(({ data }) => data)
        })
    },

    placeholderData: keepPreviousData,
  })
}
