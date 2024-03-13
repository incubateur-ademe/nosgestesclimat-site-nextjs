import { Simulation } from '@/publicodes-state/types'

export const getIsSimulationValid = (simulation: Simulation): boolean => {
  return !!simulation?.id
}
