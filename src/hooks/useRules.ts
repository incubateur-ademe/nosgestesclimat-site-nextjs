import { ABTEST_KEY, FLAG_VARIANT_KEY } from '@/constants/ab-test'
import { getRules } from '@/helpers/modelFetching/getRules'
import i18nConfig from '@/i18nConfig'
import { useUser } from '@/publicodes-state'
import type { NGCRules } from '@incubateur-ademe/nosgestesclimat'
import type { UseQueryResult } from '@tanstack/react-query'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useFeatureFlagVariantKey } from 'posthog-js/react'
import { useLocale } from './useLocale'

type Props = {
  isOptim?: boolean
  region?: string
  PRNumber?: string
}

export function useRules(
  { isOptim = true, region = 'FR', PRNumber }: Props = {
    isOptim: true,
    region: 'FR',
  }
): UseQueryResult<Partial<NGCRules>, Error> {
  const locale = useLocale()
  const { user } = useUser()

  const flagValue = useFeatureFlagVariantKey(
    locale === i18nConfig.defaultLocale ? ABTEST_KEY : ''
  )
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
        ABtesting: flagValue === FLAG_VARIANT_KEY,
      }),
    placeholderData: keepPreviousData,
    staleTime: Infinity, // We don't want to import the rule multiple times
    gcTime: 1000 * 60 * 60 * 24, // 24h
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })
}
