import { useEngine } from '@/publicodes-state'
import { Group } from '@/types/groups'

export function useFixComputedResults(group?: Group) {
  const { getComputedResults } = useEngine()

  if (!group) return group

  const participantsWithFixedComputedResults = group.participants.map(
    (participant) => {
      if (participant.simulation.computedResults?.bilan !== 0) {
        return participant
      }

      // Send an error to Sentry
      // captureException(
      //   new Error('useFixComputedResults: computedResults.bilan === 0')
      // )

      const participantWithFixedComputedResults = {
        ...participant,
        simulation: {
          ...participant.simulation,
          computedResults: getComputedResults(participant.simulation.situation),
        },
      }

      return participantWithFixedComputedResults
    }
  )

  return {
    ...group,
    participants: participantsWithFixedComputedResults,
  }
}
