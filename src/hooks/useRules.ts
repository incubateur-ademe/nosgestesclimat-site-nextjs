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
  const dataServer = useDataServer()

  const locale = useLocale()

  const { user } = useUser()

  const regionCode =
    user?.region?.code != undefined && user?.region?.code !== ''
      ? user?.region?.code
      : region

  let rules: any = null

  if (process.env.NEXT_PUBLIC_LOCAL_DATA) {
    rules = require(
      `../../../nosgestesclimat/public/co2-model.${regionCode}-lang.${locale}${
        isOptim ? '-opti' : ''
      }.json`
    )
  }

  return useQuery(
    ['rules', dataServer, lang, region, isOptim, rules],
    () =>
      rules
        ? Promise.resolve(rules as unknown)
        : axios
            .get(
              `${dataServer}/co2-model.${regionCode}-lang.${locale}${
                isOptim ? '-opti' : ''
              }.json`
            )
            .then((res) => res.data as unknown),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  )
}
