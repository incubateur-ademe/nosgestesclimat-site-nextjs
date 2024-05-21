import { getRules } from '@/helpers/modelFetching/getRules'
import { useUser } from '@/publicodes-state'
import { NGCRules } from '@incubateur-ademe/nosgestesclimat'
import {
  UseQueryResult,
  keepPreviousData,
  useQuery,
} from '@tanstack/react-query'
import { useLocale } from './useLocale'
import { usePRNumber } from './usePRNumber'

type Props = {
  isOptim?: boolean
  region?: string
}

export function useRules(
  { isOptim = true, region = 'FR' }: Props = { isOptim: true, region: 'FR' }
): UseQueryResult<NGCRules, Error> {
  const locale = useLocale()
  const { user } = useUser()

  const { PRNumber } = usePRNumber()

  const regionCode =
    user?.region?.code != undefined && user?.region?.code !== ''
      ? user?.region?.code
      : region

  return useQuery({
    queryKey: ['rules', locale, regionCode, isOptim, PRNumber],
    queryFn: () => getRules({ locale, regionCode, isOptim, PRNumber }),
    placeholderData: keepPreviousData,
    staleTime: 5000000000, // We don't want to import the rule multiple times
  })
}
