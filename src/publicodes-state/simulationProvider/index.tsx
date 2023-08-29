'use client'

import { PropsWithChildren } from 'react'

import SimulationContext from './context'
import useCategories from './useCategories'
import useCurrent from './useCurrent'
import useEngine from './useEngine'
import useProgression from './useProgression'
import useQuestions from './useQuestions'
import useSituation from './useSituation'

type Props = {
  rules: any
  categoryOrder: string[]
  defaultSituation?: any
  situation?: any
  updateSituation: Function
}

export default function SimulationProvider({
  children,
  rules,
  categoryOrder,
  defaultSituation,
  situation: externalSituation,
  updateSituation: updateExternalSituation,
}: PropsWithChildren<Props>) {
  const { engine, safeEvaluate, safeGetRule } = useEngine(rules)

  const { situation, updateSituation } = useSituation({
    engine,
    safeEvaluate,
    defaultSituation,
    externalSituation,
    updateExternalSituation,
  })

  const { categories, subcategories } = useCategories({
    engine,
    safeEvaluate,
    order: categoryOrder,
  })

  const {
    missingInputs,
    everyMosaicChildWhoIsReallyInMosaic,
    relevantQuestions,
    questionsByCategories,
  } = useQuestions({ engine, safeEvaluate, categories, situation })

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
  } = useCurrent({
    engine,
    situation,
    categories,
  })

  return (
    <SimulationContext.Provider
      value={{
        rules,
        engine,
        safeGetRule,
        safeEvaluate,
        situation,
        updateSituation,
        categories,
        subcategories,
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
