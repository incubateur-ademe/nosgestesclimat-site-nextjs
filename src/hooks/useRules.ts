import { fetchModel } from '@/helpers/data/fetchModel'
import importLocalRules from '@/helpers/importLocalRules'
import { useUser } from '@/publicodes-state'
import { NGCRules } from '@/publicodes-state/types'
import {
  UseQueryResult,
  keepPreviousData,
  useQuery,
} from '@tanstack/react-query'
import { useDataServer } from './useDataServer'
import { useLocale } from './useLocale'

type Props = {
  lang: string
  region: string
  isOptim?: boolean
}

export function useRules({
  lang,
  region,
  isOptim = true,
}: Props): UseQueryResult<NGCRules, Error> {
  const dataServer = useDataServer()
  const locale = useLocale()
  const { user } = useUser()

  const regionCode =
    user?.region?.code != undefined && user?.region?.code !== ''
      ? user?.region?.code
      : region

  return useQuery({
    queryKey: ['rules', dataServer, lang, region, isOptim],
    queryFn: () => {
      console.log(
        `⚙️ requesting ${
          isOptim ? 'optimized' : ''
        } rules for ${regionCode} ${locale}`
      )
      return process.env.NEXT_PUBLIC_LOCAL_DATA === 'nosgestesclimat'
        ? importLocalRules({ regionCode, locale, isOptim })
        : fetchModel({
            dataServer: dataServer || '',
            regionCode: regionCode || 'FR',
            locale,
            isOptim,
          })
    },
    placeholderData: keepPreviousData,
  })
}
