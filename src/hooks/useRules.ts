import { fetchModel } from '@/helpers/data/fetch-model'
import { useUser } from '@/publicodes-state'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
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
      fetchModel({
        dataServer,
        regionCode: regionCode || 'FR',
        locale,
        isOptim,
      }),

    placeholderData: keepPreviousData,
  })
}
