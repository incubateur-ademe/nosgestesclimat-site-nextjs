'use client'

import { PropsWithChildren } from 'react'

import { DottedName, NGCRules } from '../../types'
import { SimulationContext } from './context'
import { useCategories } from './useCategories'
import { useEngine } from './useEngine'
import { useRules } from './useRules'
import { useSetComputedResults } from './useSetComputedResults'
import { useSetSituation } from './useSetSituation'

type Props = {
  rules: NGCRules
  root?: DottedName
  shouldAlwaysDisplayChildren?: boolean
}
export default function SimulationProvider({
  rules,
  root = 'bilan',
  shouldAlwaysDisplayChildren = false,
  children,
}: PropsWithChildren<Props>) {
  const { engine, pristineEngine, safeEvaluate, safeGetRule } = useEngine(rules)

  const {
    everyRules,
    everyInactiveRules,
    everyQuestions,
    everyNotifications,
    everyMosaic,
    everyMosaicChildren,
    rawMissingVariables,
  } = useRules({ engine: pristineEngine, root })

  const { categories, subcategories } = useCategories({
    parsedRules: engine.getParsedRules(),
    everyRules,
    root,
    safeGetRule,
  })

  const { isInitialized } = useSetSituation({
    engine,
    everyRules,
  })

  useSetComputedResults({
    categories,
    safeEvaluate,
  })

  return (
    <SimulationContext.Provider
      value={{
        rules,
        engine,
        pristineEngine,
        safeEvaluate,
        safeGetRule,
        everyRules,
        everyInactiveRules,
        everyQuestions,
        everyNotifications,
        everyMosaic,
        everyMosaicChildren,
        rawMissingVariables,
        categories,
        subcategories,
      }}>
      {isInitialized || shouldAlwaysDisplayChildren ? children : null}
    </SimulationContext.Provider>
  )
}
