import type { Logger } from '../../logger/index.ts'
import { getSimulationById } from '../../simulations/repository/simulation.repository.ts'
import { SimulationNotFinishedException } from '../exceptions/simulation-computation.exception.ts'
import { createSimulationComputation } from '../repositories/simulation-computations.repository.ts'

interface ProgramSimulationComputationDeps {
  logger: Logger
}

export function createProgramSimulationComputation(
  _deps: ProgramSimulationComputationDeps
) {
  return async function programSimulationComputation(
    simulationId: string
  ): Promise<void> {
    const simulation = await getSimulationById(simulationId)

    if (simulation.progression !== 1) {
      throw new SimulationNotFinishedException({
        simulationId: simulation.id,
        progression: simulation.progression,
      })
    }

    await createSimulationComputation(simulationId)
  }
}
