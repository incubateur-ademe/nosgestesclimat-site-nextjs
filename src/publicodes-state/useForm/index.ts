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
    updateSituation,
    remainingCategories,
    answeredCategories,
    remainingQuestions,
    answeredQuestions,
    progression,
    remainingQuestionsByCategories,
    answeredQuestionsByCategories,
    progressionByCategory,
    actionChoices,
    toggleActionChoice,
    setActionChoiceValue,
  }: any = useContext(formContext)

  const {
    gotoPrevQuestion,
    gotoNextQuestion,
    gotoPrevCategory,
    gotoNextCategory,
    noPrevQuestion,
    noNextQuestion,
    noPrevCategory,
    noNextCategory,
  } = useNavigation({
    categories,
    questionsByCategories,
    remainingQuestionsByCategories,
    currentQuestion,
    currentCategory,
    setCurrentQuestion,
    setCurrentCategory,
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
    updateSituation,
    gotoPrevQuestion,
    gotoNextQuestion,
    gotoPrevCategory,
    gotoNextCategory,
    noPrevQuestion,
    noNextQuestion,
    noPrevCategory,
    noNextCategory,
    remainingCategories,
    answeredCategories,
    remainingQuestions,
    answeredQuestions,
    progression,
    remainingQuestionsByCategories,
    answeredQuestionsByCategories,
    progressionByCategory,
    actionChoices,
    toggleActionChoice,
    setActionChoiceValue,
  }
}
