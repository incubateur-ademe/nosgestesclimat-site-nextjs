import { getLinkToSimulateur } from '@/helpers/navigation/simulateurPages'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { useLocale } from './useLocale'

export const useQuestionInQueryParams = () => {
  const router = useRouter()

  const searchParams = useSearchParams()

  const locale = useLocale()

  const questionInQueryParams = decodeURI(searchParams.get('question') || '')
    ?.replaceAll('.', ' . ')
    .replaceAll('_', ' ') as DottedName

  const setQuestionInQueryParams = useCallback(
    (question: DottedName) =>
      router.replace(
        getLinkToSimulateur({
          question,
          locale,
          currentSearchParams: searchParams,
        }),
        { scroll: false }
      ),
    [router, locale, searchParams]
  )

  return { questionInQueryParams, setQuestionInQueryParams }
}
