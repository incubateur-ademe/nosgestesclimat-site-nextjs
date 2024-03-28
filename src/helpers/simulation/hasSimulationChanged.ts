import { Simulation } from '@/publicodes-state/types'

export function areComputedResultsDifferent(
  simulation1?: Simulation,
  simulation2?: Simulation
) {
  if (!simulation1 || !simulation2) return false

  return (
    simulation1.computedResults?.bilan !== simulation2.computedResults?.bilan &&
    (simulation1.computedResults?.categories
      ? Object.keys(simulation1.computedResults?.categories).some(
          (key) =>
            simulation1.computedResults?.categories[key] !==
            simulation2.computedResults?.categories[key]
        )
      : false)
  )
}
