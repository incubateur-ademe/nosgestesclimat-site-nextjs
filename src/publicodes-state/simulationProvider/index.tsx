'use client'

import { PropsWithChildren } from 'react'

import { Rules, Situation } from '../types'
import SimulationContext from './context'
import useCategories from './useCategories'
import useEngine from './useEngine'
import useRules from './useRules'
import useSituation from './useSituation'

type Props = {
  rules: Rules
  defaultSituation?: Situation
  situation: Situation
  updateSituation: (situation: Situation) => void
  foldedSteps: string[]
  addFoldedStep: (foldedStep: string) => void
  categoryOrder: string[]
  root?: string
}

export default function SimulationProvider({
  children,
  rules,
  defaultSituation,
  situation: externalSituation,
  updateSituation: updateExternalSituation,
  foldedSteps,
  addFoldedStep,
  categoryOrder,
  root = 'bilan',
}: PropsWithChildren<Props>) {
  const { engine, pristineEngine, safeEvaluate, safeGetRule } = useEngine(rules)

  const {
    everyRules,
    everyInactiveRules,
    everyQuestions,
    everyNotifications,
    everyMosaicChildWhoIsReallyInMosaic,
  } = useRules({ engine: pristineEngine })

  const { situation, updateSituation, initialized } = useSituation({
    engine,
    everyRules,
    defaultSituation,
    externalSituation,
    updateExternalSituation,
  })

  const { categories, subcategories } = useCategories({
    engine: pristineEngine,
    root,
    safeGetRule,
    order: categoryOrder,
  })
  console.log('initialized', initialized)
  return (
    <SimulationContext.Provider
      value={{
        rules,
        engine,
        pristineEngine,
        safeGetRule,
        safeEvaluate,
        situation,
        updateSituation,
        foldedSteps,
        addFoldedStep: (foldedStep) => {
          if (!foldedSteps.includes(foldedStep)) {
            addFoldedStep(foldedStep)
          }
        },
        everyRules,
        everyInactiveRules,
        everyQuestions,
        everyNotifications,
        everyMosaicChildWhoIsReallyInMosaic,
        categories,
        subcategories,
      }}>
      {initialized ? children : null}
    </SimulationContext.Provider>
  )
}
