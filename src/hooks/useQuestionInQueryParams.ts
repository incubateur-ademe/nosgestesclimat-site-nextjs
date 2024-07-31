import { getLinkToSimulateur } from '@/helpers/navigation/simulateurPages'
import { DottedName } from '@/publicodes-state/types'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export const useQuestionInQueryParams = () => {
  const router = useRouter()

  const searchParams = useSearchParams()

  const questionInQueryParams = decodeURI(searchParams.get('question') || '')
    ?.replaceAll('.', ' . ')
    .replaceAll('_', ' ') as DottedName

  const setQuestionInQueryParams = useCallback(
    (question: DottedName) =>
      router.replace(
        getLinkToSimulateur({ question }),

        { scroll: false }
      ),
    [router]
  )

  return { questionInQueryParams, setQuestionInQueryParams }
}
