import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export const useQuestionInQueryParams = () => {
  const router = useRouter()

  const searchParams = useSearchParams()

  const questionInQueryParams = decodeURI(searchParams.get('question') || '')
    ?.replaceAll('.', ' . ')
    .replaceAll('_', ' ')

  const setQuestionInQueryParams = useCallback(
    (question: string) =>
      router.replace(
        '/simulateur/bilan?question=' +
          question.replaceAll(' . ', '.').replaceAll(' ', '_'),
        { scroll: false }
      ),
    [router]
  )

  return { questionInQueryParams, setQuestionInQueryParams }
}
