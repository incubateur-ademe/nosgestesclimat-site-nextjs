'use client'

import type { Simulation } from '@/publicodes-state/types'
import useUser from '../useUser/useUser'

/**
 * A hook to get the current simulation and update it (via simulation.update() or updateCurrentSimulation())
 * Note: Even if currentSimulationForced is provided, we always use the simulation from context
 * to ensure updates are properly reflected. The currentSimulationForced parameter is kept for compatibility
 * but the actual simulation comes from the UserProvider context.
 */
export default function useCurrentSimulation(
  currentSimulationForced?: Simulation
) {
  const { currentSimulation, updateCurrentSimulation } = useUser()

  // Always use simulation from context to ensure updates are reflected
  // The currentSimulationForced parameter is kept for backward compatibility but not used
  return {
    ...currentSimulation,
    update: updateCurrentSimulation,
    updateCurrentSimulation,
  }
}
