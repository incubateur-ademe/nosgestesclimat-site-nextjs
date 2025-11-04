'use client'

import useUser from '../useUser/useUser'

/**
 * A hook to get the current simulation and update it (via simulation.update() or updateCurrentSimulation())
 */
export default function useCurrentSimulation() {
  const { currentSimulation, updateCurrentSimulation } = useUser()

  // Always use simulation from context to ensure updates are reflected
  // The currentSimulationForced parameter is kept for backward compatibility but not used
  return {
    ...currentSimulation,
    update: updateCurrentSimulation,
    updateCurrentSimulation,
  }
}
