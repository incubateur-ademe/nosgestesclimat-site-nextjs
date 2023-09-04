'use client'

import { PropsWithChildren, useContext } from 'react'

import simulationContext from '../simulationProvider/context'
import SimulationContext from './context'
import useCurrent from './useCurrent'
import useProgression from './useProgression'
import useQuestions from './useQuestions'

type Props = {
  root?: string
}

export default function FormProvider({
  root = 'bilan',
  children,
}: PropsWithChildren<Props>) {
  const { engine, safeEvaluate, situation, categories }: any =
    useContext(simulationContext)

  const {
    missingInputs,
    everyMosaicChildWhoIsReallyInMosaic,
    relevantQuestions,
    questionsByCategories,
  } = useQuestions({ engine, root, safeEvaluate, categories, situation })

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
        everyMosaicChildWhoIsReallyInMosaic,
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
