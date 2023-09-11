import { useForm } from '@/publicodes-state'
import { useEffect, useMemo, useRef } from 'react'

import Navigation from '@/components/form/Navigation'
import Question from '@/components/form/Question'
import { useQuestionInQueryParams } from '@/hooks/useQuestionInQueryParams'
import { useRouter } from 'next/navigation'
import CategoryIntroduction from './form/CategoryIntroduction'

export default function Form() {
  const {
    remainingCategories,
    remainingQuestionsByCategories,
    currentQuestion,
    setCurrentQuestion,
    currentCategory,
    setCurrentCategory,
  } = useForm()

  const isInitialized = useMemo(
    () => (currentQuestion && currentCategory ? true : false),
    [currentQuestion, currentCategory]
  )

  const router = useRouter()

  const { questionInQueryParams, setQuestionInQueryParams } =
    useQuestionInQueryParams()

  const prevQuestionInQueryParams = useRef(questionInQueryParams)

  useEffect(() => {
    if (!currentCategory) {
      if (questionInQueryParams) {
        setCurrentQuestion(questionInQueryParams)
        setCurrentCategory(questionInQueryParams.split(' . ')[0])
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
    if (
      currentQuestion !== questionInQueryParams &&
      prevQuestionInQueryParams.current !== questionInQueryParams
    ) {
      setCurrentQuestion(questionInQueryParams)
      setCurrentCategory(questionInQueryParams.split(' . ')[0])
    }
    prevQuestionInQueryParams.current = questionInQueryParams
  }, [
    questionInQueryParams,
    currentQuestion,
    setCurrentQuestion,
    setCurrentCategory,
  ])

  useEffect(() => {
    if (isInitialized && currentQuestion) {
      setQuestionInQueryParams(currentQuestion)
    }
  }, [
    setQuestionInQueryParams,
    currentQuestion,
    currentCategory,
    isInitialized,
  ])

  if (!currentCategory) return

  return currentQuestion ? (
    <div className="mb-4 rounded-lg bg-primaryLight p-4">
      <Question question={currentQuestion} key={currentQuestion} />
      <Navigation
        question={currentQuestion}
        onComplete={() => router.push('/fin')}
      />
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
