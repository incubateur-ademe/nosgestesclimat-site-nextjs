import { useForm } from '@/publicodes-state'
import { useEffect, useMemo, useRef } from 'react'

import { useQuestionInQueryParams } from '@/hooks/useQuestionInQueryParams'
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

  const isInitialized = useMemo(
    () => (currentQuestion && currentCategory ? true : false),
    [currentQuestion, currentCategory]
  )

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
    if (isInitialized) {
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
