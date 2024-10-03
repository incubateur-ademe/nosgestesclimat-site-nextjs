'use client'

import { PropsWithChildren } from 'react'

import { useCategories } from '@/publicodes-state/contexts/simulationContext/hooks/useCategories'
import { useEngineSituation } from '@/publicodes-state/contexts/simulationContext/hooks/useEngineSituation'
import { useInternalEngine } from '@/publicodes-state/contexts/simulationContext/hooks/useInternalEngine'
import { useRules } from '@/publicodes-state/contexts/simulationContext/hooks/useRules'
import { useSetComputedResults } from '@/publicodes-state/contexts/simulationContext/hooks/useSetComputedResults'
import { DottedName, NGCRules } from '@incubateur-ademe/nosgestesclimat'
import { SimulationContext } from './context'

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
  const { engine, pristineEngine, safeEvaluate, safeGetRule } =
    useInternalEngine(rules)

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
  })

  const { isInitialized } = useSetComputedResults({
    categories,
    subcategories,
    isEngineInitialized,
    safeGetRule,
    safeEvaluate: safeEvaluate ?? undefined,
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