'use client'

import { useCurrentSimulation } from '@/publicodes-state'

import type { DottedName } from '@abc-transitionbascarbone/near-modele'
import type { PropsWithChildren } from 'react'
import { useContext } from 'react'
import { SimulationContext } from '../simulationProvider/context'
import FormContext from './context'
import useCurrent from './useCurrent'
import useProgression from './useProgression'
import useQuestions from './useQuestions'

type Props = {
  root?: DottedName
}

export default function FormProvider({
  root = 'bilan',
  children,
}: PropsWithChildren<Props>) {
  const {
    categories,
    subcategories,
    safeEvaluate,
    everyQuestions,
    everyMosaicChildrenWithParent,
  } = useContext(SimulationContext)

  const { situation, foldedSteps, updateCurrentSimulation } =
    useCurrentSimulation()

  const {
    currentQuestion,
    currentCategory,
    setCurrentQuestion,
    setCurrentCategory,
  } = useCurrent()

  const {
    remainingQuestions,
    relevantAnsweredQuestions,
    relevantQuestions,
    questionsByCategories,
  } = useQuestions({
    root,
    safeEvaluate,
    categories,
    subcategories,
    foldedSteps,
    situation,
    everyQuestions,
    everyMosaicChildrenWithParent,
  })

  const { remainingQuestionsByCategories } = useProgression({
    categories,
    remainingQuestions,
    relevantQuestions,
    updateCurrentSimulation,
  })

  return (
    <FormContext.Provider
      value={{
        questionsByCategories,
        relevantQuestions,
        remainingQuestions,
        relevantAnsweredQuestions,
        remainingQuestionsByCategories,
        currentQuestion,
        currentCategory,
        setCurrentQuestion,
        setCurrentCategory,
      }}>
      {children}
    </FormContext.Provider>
  )
}
