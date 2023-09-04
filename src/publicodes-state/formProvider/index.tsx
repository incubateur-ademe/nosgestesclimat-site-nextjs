'use client'

import { PropsWithChildren, useContext } from 'react'

import simulationContext from '../simulationProvider/context'
import SimulationContext from './context'
import useCategories from './useCategories'
import useCurrent from './useCurrent'
import useProgression from './useProgression'
import useQuestions from './useQuestions'

type Props = {
  root?: string
  categoryOrder: string[]
}

export default function FormProvider({
  root = 'bilan',
  categoryOrder,
  children,
}: PropsWithChildren<Props>) {
  const { engine, safeEvaluate, situation }: any = useContext(simulationContext)

  const { categories, subcategories } = useCategories({
    engine,
    root,
    safeEvaluate,
    order: categoryOrder,
  })

  const { missingInputs, relevantQuestions, questionsByCategories } =
    useQuestions({ engine, root, safeEvaluate, categories, situation })

  const {
    remainingCategories,
    answeredCategories,
    remainingQuestions,
    answeredQuestions,
    progression,
    remainingQuestionsByCategories,
    answeredQuestionsByCategories,
    progressionByCategory,
  } = useProgression({
    categories,
    missingInputs,
    relevantQuestions,
    questionsByCategories,
  })

  const {
    currentQuestion,
    currentCategory,
    setCurrentQuestion,
    setCurrentCategory,
  } = useCurrent()

  return (
    <SimulationContext.Provider
      value={{
        categories,
        subcategories,
        relevantQuestions,
        questionsByCategories,
        remainingCategories,
        answeredCategories,
        remainingQuestions,
        answeredQuestions,
        progression,
        remainingQuestionsByCategories,
        answeredQuestionsByCategories,
        progressionByCategory,
        currentQuestion,
        currentCategory,
        setCurrentQuestion,
        setCurrentCategory,
      }}>
      {children}
    </SimulationContext.Provider>
  )
}
