'use client'

import { useContext } from 'react'
import formContext from '../formProvider/context'
import useNavigation from './useNavigation'

export default function useForm() {
  const {
    categories,
    subcategories,
    relevantQuestions,
    questionsByCategories,
    currentQuestion,
    currentCategory,
    setCurrentQuestion,
    setCurrentCategory,
    remainingQuestions,
    progression,
    remainingQuestionsByCategories,
  } = useContext(formContext)

  const {
    gotoPrevQuestion,
    gotoNextQuestion,
    noPrevQuestion,
    noNextQuestion,
    isLastQuestionOfCategory,
  } = useNavigation({
    remainingQuestions,
    relevantQuestions,
    currentQuestion,
    setCurrentQuestion,
  })

  return {
    categories,
    subcategories,
    relevantQuestions,
    questionsByCategories,
    currentQuestion,
    currentCategory,
    setCurrentQuestion,
    setCurrentCategory,
    gotoPrevQuestion,
    gotoNextQuestion,
    noPrevQuestion,
    noNextQuestion,
    isLastQuestionOfCategory,
    remainingQuestions,
    progression,
    remainingQuestionsByCategories,
  }
}
