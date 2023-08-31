import { useForm } from '@/publicodes-state'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo } from 'react'

import CategoryIntroduction from './form/CategoryIntroduction'
import Navigation from './form/Navigation'
import Question from './form/Question'

export default function Form() {
  const {
    remainingCategories,
    remainingQuestionsByCategories,
    currentQuestion,
    setCurrentQuestion,
    currentCategory,
    setCurrentCategory,
  } = useForm()

  const router = useRouter()

  const isInitialized = useMemo(
    () => (currentQuestion && currentCategory ? true : false),
    [currentQuestion, currentCategory]
  )

  const searchParams = useSearchParams()
  const questionInQueryParams = searchParams.get('question')

  useEffect(() => {
    if (!currentCategory) {
      if (questionInQueryParams) {
        setCurrentQuestion(
          decodeURI(
            questionInQueryParams.replaceAll('.', ' . ').replaceAll('_', ' ')
          )
        )
        setCurrentCategory(
          decodeURI(questionInQueryParams.split('.')[0].replaceAll('_', ' '))
        )
      } else {
        setCurrentCategory(remainingCategories[0])
      }
    }
  }, [
    currentCategory,
    questionInQueryParams,
    remainingCategories,
    remainingQuestionsByCategories,
    setCurrentCategory,
    setCurrentQuestion,
  ])

  useEffect(() => {
    if (isInitialized) {
      // router.push(
      //   '/simulateur/bilan?question=' +
      //     currentQuestion.replaceAll(' . ', '.').replaceAll(' ', '_'),
      //   { scroll: false }
      // )
    }
  }, [router, currentQuestion, currentCategory, isInitialized])

  if (!currentCategory) return
  return currentQuestion ? (
    <div className="rounded-lg bg-primaryLight p-4 mb-4">
      <Question question={currentQuestion} key={currentQuestion} />
      <Navigation question={currentQuestion} />
    </div>
  ) : (
    <CategoryIntroduction
      category={currentCategory}
      startCategory={() =>
        setCurrentQuestion(remainingQuestionsByCategories[currentCategory][0])
      }
    />
  )
}
