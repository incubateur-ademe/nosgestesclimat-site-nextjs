import { metrics } from '@/constants/model/metric'
import { getInitialExtendedSituation } from '@/helpers/modelFetching/getInitialExtendedSituation'
import type { Simulation } from '@/helpers/server/model/simulations'
import type {
  ComputedResults,
  ComputedResultsFootprint,
} from '@/publicodes-state/types'
import { v4 as uuidv4 } from 'uuid'

/**
 * Builds the body of a simulation about to be persisted.
 *
 * Server-only on purpose: a simulation exists once the API has stored it, so
 * nothing client-side may construct one. `model` can only be resolved
 * server-side anyway (the region lives in an httpOnly cookie) — see
 * `resolveNewSimulationModelString()`.
 */
export function buildNewSimulationPayload({
  id = uuidv4(),
  date = new Date().toISOString(),
  situation = {},
  extendedSituation = getInitialExtendedSituation(),
  foldedSteps = [],
  actionChoices = {},
  persona,
  computedResults = metrics.reduce((acc, metric) => {
    acc[metric] = {
      bilan: 0,
      categories: {
        transport: 0,
        alimentation: 0,
        logement: 0,
        divers: 0,
        'services sociétaux': 0,
      },
      subcategories: {},
    } as ComputedResultsFootprint
    return acc
  }, {} as ComputedResults),
  progression = 0,
  polls,
  groups,
  model,
}: Partial<Omit<Simulation, 'model'>> & { model: string }): Simulation {
  return {
    id,
    date,
    situation,
    foldedSteps,
    extendedSituation,
    actionChoices,
    persona,
    computedResults,
    progression,
    polls,
    groups,
    model,
  }
}
