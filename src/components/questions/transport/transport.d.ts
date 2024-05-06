import { UpdateCurrentSimulationProps } from '@/publicodes-state/types'

export type HookProps = {
  answers: Record<string, unknown>
  isPristine: boolean
  updateCurrentSimulation: (simulation: UpdateCurrentSimulationProps) => void
}
