'use client'

import { PropsWithChildren } from 'react'

import { NGCRules } from '@incubateur-ademe/nosgestesclimat'
import { DottedName } from '../../types'
import { SimulationContext } from './context'
import { useCategories } from './useCategories'
import { useEngine } from './useEngine'
import { useEngineSituation } from './useEngineSituation'
import { useRules } from './useRules'
import { useSetComputedResults } from './useSetComputedResults'

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
    everyUiCategories,
    everyMosaicChildrenWithParent,
    rawMissingVariables,
  } = useRules({ engine: pristineEngine, root })

  const { categories, subcategories } = useCategories({
    parsedRules: engine.getParsedRules(),
    everyRules,
    root,
    safeGetRule,
  })

  const { isInitialized, addToEngineSituation } = useEngineSituation({
    engine,
    everyRules,
  })

  useSetComputedResults({
    categories,
    safeEvaluate,
    isInitialized,
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
        everyUiCategories,
        everyMosaicChildrenWithParent,
        rawMissingVariables,
        categories,
        subcategories,
        addToEngineSituation,
      }}>
      {isInitialized || shouldAlwaysDisplayChildren ? children : null}
    </SimulationContext.Provider>
  )
}
