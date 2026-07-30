import { log } from '../../logger/index.ts'
import { getSimulationById } from '../../simulations/repository/simulation.repository.ts'
import {
  SimulationNotFinishedException,
  UnsupportedModelException,
} from '../exceptions/simulation-computation.exception.ts'
import { isModelSupported } from '../model-support/is-model-supported.ts'
import { createSimulationComputation } from '../repositories/simulation-computations.repository.ts'
export const programSimulationComputation = async (
  simulationId: string
): Promise<void> => {
  const simulation = await getSimulationById(simulationId)

  if (simulation.progression !== 1) {
    throw new SimulationNotFinishedException({
      simulationId: simulation.id,
      progression: simulation.progression,
    })
  }

  if (!isModelSupported(simulation.model)) {
    log(new UnsupportedModelException({ model: simulation.model }))
    return
  }

  await createSimulationComputation(simulationId)
}
