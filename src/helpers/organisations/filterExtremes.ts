import { carboneMetric } from '@/constants/metric'
import type { Simulation } from '@/types/organisations'

const MAX_VALUE = 100000

export function filterExtremes(simulations: Simulation[]) {
  return simulations?.filter((simulation) => {
    // Remove simulations with too high values
    if (
      [
        simulation.computedResults?.[carboneMetric]?.bilan,
        ...Object.values(
          simulation.computedResults?.[carboneMetric]?.categories ?? {}
        ),
      ].some((value) => (value as number) > MAX_VALUE)
    ) {
      return false
    }

    return true
  })
}
