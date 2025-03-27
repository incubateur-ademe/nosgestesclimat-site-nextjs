import type { Simulation } from '@/publicodes-state/types'

export default function getGroupListFromSimulations(simulations: Simulation[]) {
  return simulations.map((simulation) => simulation.groups ?? []).flat()
}
