'use client'

import { useCurrentSimulation } from '@/publicodes-state'

import { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { PropsWithChildren, useContext } from 'react'
import useCurrent from '../../hooks/formProvider/useCurrent'
import useProgression from '../../hooks/formProvider/useProgression'
import useQuestions from '../../hooks/formProvider/useQuestions'
import { SimulationContext } from '../simulationContext/context'
import FormContext from './context'

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
    rawMissingVariables,
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
    rawMissingVariables,
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
