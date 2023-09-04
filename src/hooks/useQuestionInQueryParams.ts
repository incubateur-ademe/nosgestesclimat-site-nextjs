import { useRouter, useSearchParams } from 'next/navigation'

export const useQuestionInQueryParams = () => {
  const router = useRouter()

  const searchParams = useSearchParams()

  const questionInQueryParams = decodeURI(searchParams.get('question') || '')
    ?.replaceAll('.', ' . ')
    .replaceAll('_', ' ')

  const setQuestionInQueryParams = (question: string) =>
    router.push(
      '/simulateur/bilan?question=' +
        question.replaceAll(' . ', '.').replaceAll(' ', '_'),
      { scroll: false }
    )

  return { questionInQueryParams, setQuestionInQueryParams }
}
