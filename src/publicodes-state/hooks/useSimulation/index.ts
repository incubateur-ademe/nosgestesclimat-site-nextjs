import SimulationContext from '@/publicodes-state/providers/simulationProvider/context'
import { useContext } from 'react'

/**
 * A hook that make available some information on the current instanciated simulation.
 */
export default function useSimulation() {
  const { categories, subcategories, everyQuestions } =
    useContext(SimulationContext)

  return {
    categories,
    subcategories,
    everyQuestions,
  }
}
