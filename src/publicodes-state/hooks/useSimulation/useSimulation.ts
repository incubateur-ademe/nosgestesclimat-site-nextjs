import { SimulationContext } from '@/publicodes-state/providers/simulationProvider/context'
import { useContext } from 'react'

/**
 * A hook that make available some information on the current instanciated simulation.
 */
export default function useSimulation() {
  const {
    rules,
    engine,
    pristineEngine,
    safeGetRule,
    safeEvaluate,
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
  } = useContext(SimulationContext)

  return {
    rules,
    engine,
    pristineEngine,
    safeGetRule,
    safeEvaluate,
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
  }
}
