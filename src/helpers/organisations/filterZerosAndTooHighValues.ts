import { SimulationRecap } from '@/types/organisations'

const MAX_VALUE = 100000

export function filterZerosAndTooHighValues(
  simulationRecaps: SimulationRecap[]
) {
  return simulationRecaps.filter((simulationRecap) => {
    // Avoid breaking the UI if the simulation data is invalid
    if (simulationRecap.bilan === 0) {
      return false
    }

    // Remove simulations with too high values
    if (
      [simulationRecap.bilan, Object.values(simulationRecap.categories)].some(
        (value) => (value as number) > MAX_VALUE
      )
    ) {
      return false
    }

    return true
  })
}
