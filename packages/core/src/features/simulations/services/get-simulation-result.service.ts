import { findGroupSummaryById } from '../../groups/repositories/group.repository.ts'
import type { GroupSummary } from '../../groups/types/group.ts'
import { findPollSummaryById } from '../../polls/repositories/poll.repository.ts'
import type { PollSummary } from '../../polls/types/poll.ts'
import { migrateSimulationIfNeeded } from '../helpers/migrate-simulation.ts'
import {
  findCompletedSimulations,
  findSimulationById,
} from '../repository/simulation.repository.ts'
import type { Simulation } from '../types/simulation.ts'

export type Tendency = 'increase' | 'decrease'

export type SimulationResultGroupInfo =
  | { type: 'group'; value: GroupSummary }
  | { type: 'poll'; value: PollSummary }

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

export type GetSimulationResultParams =
  | { by: 'latest'; withTendency: boolean; userId: string }
  | { by: 'id'; id: string; userId: string }

export const getSimulationResult = async (
  params: GetSimulationResultParams
): Promise<SimulationResult | null> => {
  const { by, userId } = params

  let simulation: Simulation | null
  let previousSimulation: Simulation | null = null
  let withTendency = false

  if (by === 'id') {
    simulation = await findSimulationById({ id: params.id, userId })
  } else {
    withTendency = params.withTendency
    const limit = withTendency ? 2 : 1
    const simulations = await findCompletedSimulations({ userId, limit })
    simulation = simulations[0] ?? null
    if (simulations.length > 1) {
      previousSimulation = simulations[1]
    }
  }

  if (!simulation) return null

  simulation = migrateSimulationIfNeeded(simulation)
  if (previousSimulation) {
    previousSimulation = migrateSimulationIfNeeded(previousSimulation)
  }

  let group: SimulationResultGroupInfo | null = null

  if (simulation.groups?.length) {
    const groupSummary = await findGroupSummaryById({
      id: simulation.groups[0].id,
    })
    if (groupSummary) {
      group = { type: 'group', value: groupSummary }
    }
  }

  if (!group && simulation.polls?.length) {
    const pollSummary = await findPollSummaryById({
      id: simulation.polls[0].id,
    })
    if (pollSummary) {
      group = { type: 'poll', value: pollSummary }
    }
  }

  if (withTendency && previousSimulation) {
    const tendency = computeTendency(
      previousSimulation.computedResults.carbone.bilan,
      simulation.computedResults.carbone.bilan
    )
    return {
      type: 'tendency',
      simulation,
      previousSimulation,
      group,
      tendency,
    }
  }

  return {
    type: 'result',
    simulation,
    previousSimulation: null,
    group,
    tendency: null,
  }
}

const computeTendency = (
  previousValue: number,
  currentValue: number
): Tendency => {
  return previousValue < currentValue ? 'increase' : 'decrease'
}
