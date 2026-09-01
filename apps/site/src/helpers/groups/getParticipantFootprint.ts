import type { Participant } from '@/types/groups'
import type { Metrics } from '@incubateur-ademe/nosgestesclimat'

/**
 * Reads a participant's footprint for a metric, or `undefined` when they have
 * none for it.
 *
 * `ComputedResults` is typed as a total record, but simulations persisted
 * before a metric existed carry only the metrics of their time — hence the
 * widening, kept here so that callers get an honest `number | undefined`.
 */
export const getParticipantFootprint = (
  { simulation }: Participant,
  metric: Metrics
): number | undefined =>
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  simulation.computedResults[metric]?.bilan
