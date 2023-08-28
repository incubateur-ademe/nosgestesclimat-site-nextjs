'use client'

import { useContext } from 'react'

import { useRule } from '..'
import simulationContext from '../simulationProvider/context'
import useNavigation from './useNavigation'

export default function useForm() {
  const {
    categories,
    subcategories,
    relevantQuestions,
    remainingQuestions,
    questionsByCategories,
    currentQuestion,
    currentCategory,
    setCurrentQuestion,
    updateSituation,
    progression,
    progressionByCategory,
  }: any = useContext(simulationContext)

  const { setDefaultAsValue } = useRule(currentQuestion)

  const {
    gotoNextQuestion,
    gotoPrevQuestion,
    noPrevQuestion,
    noNextQuestion,
    noNextQuestionInCategory,
  } = useNavigation({
    relevantQuestions,
    questionsByCategories,
    currentQuestion,
    currentCategory,
    setCurrentQuestion,
    setDefaultAsValue,
  })

  return {
    categories,
    subcategories,
    relevantQuestions,
    remainingQuestions,
    questionsByCategories,
    currentQuestion,
    setCurrentQuestion,
    updateSituation,
    gotoNextQuestion,
    gotoPrevQuestion,
    noPrevQuestion,
    noNextQuestion,
    noNextQuestionInCategory,
    currentCategory,
    progression,
    progressionByCategory,
  }
}
