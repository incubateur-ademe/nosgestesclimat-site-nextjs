import { carboneMetric } from '@/constants/metric'
import { Simulation } from '@/publicodes-state/types'
import { SimulationRecap } from '@/types/organisations'

const MAX_VALUE = 100000

export function filterExtremes(
  simulationRecaps: (SimulationRecap | Simulation)[]
) {
  return simulationRecaps?.filter((simulationRecap) => {
    // Remove simulations with too high values
    if (
      [
        simulationRecap.computedResults?.[carboneMetric]?.bilan,
        ...Object.values(
          simulationRecap.computedResults?.[carboneMetric]?.categories ?? {}
        ),
      ].some((value) => (value as number) > MAX_VALUE)
    ) {
      return false
    }

    return true
  })
}
