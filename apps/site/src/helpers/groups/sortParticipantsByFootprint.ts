import type { Participant } from '@/types/groups'
import type { Metrics } from '@incubateur-ademe/nosgestesclimat'
import { getParticipantFootprint } from './getParticipantFootprint'

/**
 * Orders participants by ascending footprint, lightest first.
 *
 * Returns a new array: the one it is given comes straight from the server
 * payload and is rendered by sibling components, which must not see it
 * reordered under them.
 *
 * The comparator is total — participants without a footprint for the metric go
 * last, and ties keep their incoming order — so the same group always yields
 * the same ranking, whichever engine runs the sort.
 */
export const sortParticipantsByFootprint = (
  participants: Participant[],
  metric: Metrics
): Participant[] =>
  participants.toSorted((participantA, participantB) => {
    const footprintA = getParticipantFootprint(participantA, metric)
    const footprintB = getParticipantFootprint(participantB, metric)

    if (footprintA === undefined) {
      return footprintB === undefined ? 0 : 1
    }

    if (footprintB === undefined) {
      return -1
    }

    return footprintA - footprintB
  })
