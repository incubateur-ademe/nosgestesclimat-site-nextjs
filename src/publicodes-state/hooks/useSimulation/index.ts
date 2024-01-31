import simulationContext from '@/publicodes-state/providers/simulationProvider/context'
import { useContext } from 'react'

/**
 * A hook that make available some information on the current instanciated simulation.
 */
export default function useSimulation() {
  const {
    categories,
    subcategories,
    everyQuestions,
    everyMosaic,
    everyMosaicChildren,
    safeEvaluate,
    safeGetRule,
  } = useContext(simulationContext)

  return {
    categories: [...categories],
    subcategories,
    everyQuestions,
    everyMosaic,
    everyMosaicChildren,
    safeEvaluate,
    safeGetRule,
  }
}
