import type {
  SimulationResultGroupInfo,
  Tendency,
} from '@nosgestesclimat/core/features/simulations/services/get-simulation-result.service'

import type { Simulation } from '@/helpers/server/model/simulations'

interface SimulationResultBase {
  simulation: Simulation
  group: SimulationResultGroupInfo | null
}

export interface TendencySimulationResult extends SimulationResultBase {
  type: 'tendency'
  previousSimulation: Simulation
  tendency: Tendency
}

export interface PlainSimulationResult extends SimulationResultBase {
  type: 'result'
  previousSimulation: null
  tendency: null
}

export type SimulationResult = TendencySimulationResult | PlainSimulationResult
