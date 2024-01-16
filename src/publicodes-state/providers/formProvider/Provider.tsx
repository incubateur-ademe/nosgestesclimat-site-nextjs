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
    rules,
    categories,
    subcategories,
    safeGetRule,
    safeEvaluate,
    pristineEngine,
    situation,
    foldedSteps,
    everyQuestions,
    everyMosaicChildren,
    updateProgression,
  } = useContext(simulationContext)

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
    pristineEngine,
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
