import { getRules } from '@/helpers/modelFetching/getRules'
import { useUser } from '@/publicodes-state'
import type { NGCRules } from '@incubateur-ademe/nosgestesclimat'
import type { UseQueryResult } from '@tanstack/react-query'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useLocale } from './useLocale'

type Props = {
  isOptim?: boolean
  region?: string
  PRNumber?: string
}

export function useRules(
  { isOptim, region, PRNumber }: Props = {
    isOptim: false,
    region: 'FR',
  }
): UseQueryResult<Partial<NGCRules>, Error> {
  const locale = useLocale()
  const { user } = useUser()

  // This is used to load the rules from the test model in case of AB testing
  // uncomment when needed
  const flagValue = undefined /* useFeatureFlagVariantKey(
    locale === i18nConfig.defaultLocale ? ABTEST_KEY : ''
  )*/

  const regionCode =
    user?.region?.code != undefined && user?.region?.code !== ''
      ? user?.region?.code
      : region

  return useQuery({
    queryKey: ['rules', locale, regionCode, isOptim, PRNumber],
    queryFn: () =>
      getRules({
        locale,
        regionCode,
        isOptim,
        PRNumber,
      }),
    placeholderData: keepPreviousData,
    staleTime: Infinity, // We don't want to import the rule multiple times
    gcTime: 1000 * 60 * 60 * 24, // 24h
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })
}
