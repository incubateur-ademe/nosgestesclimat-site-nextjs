import { carboneMetric } from '@/constants/model/metric'
import type { PublicPollSimulation } from '@/types/organisations'

const MAX_VALUE = 100000

export function filterExtremes(simulations: PublicPollSimulation[]) {
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
