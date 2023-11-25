import { NGC_MODEL_API_URL, NGC_MODEL_API_URL_FALLBACK } from '@/constants/urls'
import { fetchModel } from '@/helpers/data/fetchModel'
import importLocalRules from '@/helpers/importLocalRules'
import { useUser } from '@/publicodes-state'
import { NGCRules } from '@/publicodes-state/types'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
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
    queryFn: () =>
      process.env.NEXT_PUBLIC_LOCAL_DATA === 'nosgestesclimat'
        ? importLocalRules({ regionCode, locale, isOptim })
        : fetchModel({
            dataServer: dataServer || '',
            regionCode: regionCode || 'FR',
            locale,
            isOptim,
          }),
    queryFn: async () => {
      if (process.env.NEXT_PUBLIC_LOCAL_DATA === 'nosgestesclimat') {
        return importLocalRules({ regionCode, locale, isOptim })
      }
      return axios
        .get(URLToFetch)
        .then(({ data }) => data as NGCRules)
        .catch((err) => {
          console.warn(`Failed to fetch rules from: ${URLToFetch}`, err.message)
          const fallbackURL = getURLToFetch(
            NGC_MODEL_API_URL_FALLBACK,
            locale,
            regionCode,
            isOptim
          )
          console.warn(`Falling back to: ${fallbackURL}`)
          return axios.get(fallbackURL).then(({ data }) => data as NGCRules)
        })
    },

    placeholderData: keepPreviousData,
  })
}
