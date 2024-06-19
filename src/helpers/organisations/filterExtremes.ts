import { SimulationRecap } from '@/types/organisations'

const MAX_VALUE = 100000

export function filterExtremes(simulationRecaps: SimulationRecap[]) {
  return simulationRecaps.filter((simulationRecap) => {
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
