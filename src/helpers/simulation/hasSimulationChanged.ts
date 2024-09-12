import { defaultMetric } from '@/constants/metric'
import { Simulation } from '@/publicodes-state/types'
import { DottedName } from '@incubateur-ademe/nosgestesclimat'

export function areComputedResultsDifferent(
  simulation1?: Simulation,
  simulation2?: Simulation
) {
  if (!simulation1 || !simulation2) return false

  return (
    simulation1.computedResults[defaultMetric].bilan !==
      simulation2.computedResults[defaultMetric].bilan &&
    (simulation1.computedResults[defaultMetric].categories
      ? (
          Object.keys(
            simulation1.computedResults[defaultMetric].categories
          ) as DottedName[]
        ).some(
          (key) =>
            simulation1.computedResults[defaultMetric].categories[key] !==
            simulation2.computedResults[defaultMetric].categories[key]
        )
      : false)
  )
}
