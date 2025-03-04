import { getLinkToSimulateur } from '@/helpers/navigation/simulateurPages'
import type { DottedName } from '@abc-transitionbascarbone/near-modele'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { useLocale } from './useLocale'

export const useQuestionInQueryParams = () => {
  const router = useRouter()

  const searchParams = useSearchParams()

  const locale = useLocale()

  const questionInQueryParams = decodeURI(searchParams?.get('question') || '')
    ?.replaceAll('.', ' . ')
    .replaceAll('_', ' ') as DottedName

  const setQuestionInQueryParams = useCallback(
    (question: DottedName) =>
      router.replace(
        getLinkToSimulateur({ question, locale }),

        { scroll: false }
      ),
    [router, locale]
  )

  return { questionInQueryParams, setQuestionInQueryParams }
}
