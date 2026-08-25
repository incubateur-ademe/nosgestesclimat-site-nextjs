import type { Handler } from '../../../core/event-bus/handler.ts'
import { updatePollStatsAfterSimulationChange } from '../../organisations/organisations.service.ts'
import type { SimulationUpsertedAsyncEvent } from '../events/SimulationUpserted.event.ts'

export const computePollStats: Handler<SimulationUpsertedAsyncEvent> = ({
  attributes: { simulation, created, poll },
}) => {
  if (simulation.progression !== 1) {
    return
  }

  return updatePollStatsAfterSimulationChange({ simulation, created, poll })
}
