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
    safeEvaluate,
    safeGetRule,
    situation,
    foldedSteps,
    everyQuestions,
    everyInactiveRules,
    everyMosaicChildWhoIsReallyInMosaic,
  } = useContext(simulationContext)

  const { missingVariables, relevantQuestions, questionsByCategories } =
    useQuestions({
      root,
      safeEvaluate,
      categories,
      foldedSteps,
      situation,
      everyQuestions,
      everyMosaicChildWhoIsReallyInMosaic,
    })

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
    missingVariables,
    everyQuestions,
    everyInactiveRules,
    categories,
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
    <FormContext.Provider
      value={{
        // TODO: Categories shouldn't be returned by this provider
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
    </FormContext.Provider>
  )
}
