'use client'

import { PropsWithChildren } from 'react'

import { useCategories } from '@/publicodes-state/hooks/simulationProvider/useCategories'
import { useEngineSituation } from '@/publicodes-state/hooks/simulationProvider/useEngineSituation'
import { useInternalEngine } from '@/publicodes-state/hooks/simulationProvider/useInternalEngine'
import { useRules } from '@/publicodes-state/hooks/simulationProvider/useRules'
import { useSetComputedResults } from '@/publicodes-state/hooks/simulationProvider/useSetComputedResults'
import { NGCRules } from '@incubateur-ademe/nosgestesclimat'
import { DottedName } from '../../types'
import { SimulationContext } from './context'

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
  } = useRules({ engine: pristineEngine, root })

  const { categories, subcategories } = useCategories({
    parsedRules: engine.getParsedRules(),
    everyRules,
    root,
    safeGetRule,
  })

  const { isEngineInitialized, addToEngineSituation } = useEngineSituation({
    engine,
  })

  const { isInitialized } = useSetComputedResults({
    categories,
    isEngineInitialized,
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
      {isInitialized || shouldAlwaysDisplayChildren ? children : null}
    </SimulationContext.Provider>
  )
}
