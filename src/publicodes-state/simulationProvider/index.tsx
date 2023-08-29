'use client'

import { PropsWithChildren, ReactNode } from 'react'

import SimulationContext from './context'
import useCategories from './useCategories'
import useCurrent from './useCurrent'
import useEngine from './useEngine'
import useInitialisation from './useInitialisation'
import useProgression from './useProgression'
import useQuestions from './useQuestions'
import useSituation from './useSituation'

type Props = {
  rules: any
  categoryOrder: string[]
  loader: ReactNode
  defaultSituation?: any
  situation?: any
  updateSituation: (arg: any) => void
}

export default function SimulationProvider({
  children,
  rules,
  categoryOrder,
  loader,
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
    remainingQuestions,
    progression,
    remainingQuestionsByCategories,
    progressionByCategory,
  } = useProgression({
    categories,
    missingInputs,
    relevantQuestions,
    questionsByCategories,
  })

  const { currentQuestion, currentCategory, setCurrentQuestion } = useCurrent({
    engine,
    situation,
    remainingQuestions,
    categories,
  })

  const formInitialized = useInitialisation({
    currentQuestion,
    currentCategory,
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
        progression,
        remainingQuestions,
        remainingQuestionsByCategories,
        progressionByCategory,
        currentQuestion,
        currentCategory,
        setCurrentQuestion,
      }}>
      {formInitialized ? children : loader}
    </SimulationContext.Provider>
  )
}
