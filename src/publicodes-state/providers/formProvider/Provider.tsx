'use client'

import { PropsWithChildren, useContext } from 'react'
import simulationContext from '../simulationProvider/context'
import FormContext from './context'
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
  const {
    categories,
    subcategories,
    safeGetRule,
    safeEvaluate,
    situation,
    foldedSteps,
    everyQuestions,
    everyMosaicChildren,
    updateProgression,
  } = useContext(simulationContext)

  const {
    remainingQuestions,
    relevantAnsweredQuestions,
    relevantQuestions,
    questionsByCategories,
  } = useQuestions({
    root,
    safeGetRule,
    safeEvaluate,
    categories,
    subcategories,
    foldedSteps,
    situation,
    everyQuestions,
    everyMosaicChildren,
  })

  const { progression, remainingQuestionsByCategories } = useProgression({
    categories,
    remainingQuestions,
    relevantQuestions,
    updateProgression,
  })

  const {
    currentQuestion,
    currentCategory,
    setCurrentQuestion,
    setCurrentCategory,
  } = useCurrent()

  return (
    <FormContext.Provider
      value={{
        // TODO: Categories shouldn't be returned by this provider
        categories,
        subcategories,
        relevantQuestions,
        questionsByCategories,
        remainingQuestions,
        relevantAnsweredQuestions,
        progression,
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
