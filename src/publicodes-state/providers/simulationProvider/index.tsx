'use client'

import type { PropsWithChildren } from 'react'

import type { DottedName, NGCRules } from '@abc-transitionbascarbone/near-modele'
import { SimulationContext } from './context'
import { useCategories } from './useCategories'
import { useEngine } from './useEngine'
import { useEngineSituation } from './useEngineSituation'
import { useRules } from './useRules'
import { useSetComputedResults } from './useSetComputedResults'

type Props = {
  rules?: NGCRules
  root?: DottedName
  shouldAlwaysDisplayChildren?: boolean
}
export default function SimulationProvider({
  rules,
  root = 'bilan',
  children,
}: PropsWithChildren<Props>) {
  const { engine, pristineEngine, safeEvaluate, safeGetRule } = useEngine(rules)

  const {
    parsedRules,
    everyRules,
    everyInactiveRules,
    everyQuestions,
    everyNotifications,
    everyUiCategories,
    everyMosaicChildrenWithParent,
    rawMissingVariables,
  } = useRules({ engine: pristineEngine ?? undefined, root })

  const { categories, subcategories } = useCategories({
    parsedRules,
    everyRules,
    root,
    safeGetRule: safeGetRule ?? undefined,
  })

  const { isEngineInitialized, addToEngineSituation } = useEngineSituation({
    engine,
    safeEvaluate,
    rawMissingVariables,
  })

  const { isInitialized } = useSetComputedResults({
    categories,
    subcategories,
    isEngineInitialized,
    safeGetRule,
    safeEvaluate,
  })

  if (!rules || !engine || !isInitialized) return children

  return (
    <SimulationContext.Provider
      value={{
        rules,
        engine,
        pristineEngine,
        safeEvaluate,
        safeGetRule: safeGetRule ?? undefined,
        parsedRules,
        everyRules,
        everyInactiveRules,
        everyQuestions,
        everyNotifications,
        everyUiCategories,
        everyMosaicChildrenWithParent,
        rawMissingVariables,
        categories,
        subcategories,
        addToEngineSituation,
        isInitialized,
      }}>
      {children}
    </SimulationContext.Provider>
  )
}
