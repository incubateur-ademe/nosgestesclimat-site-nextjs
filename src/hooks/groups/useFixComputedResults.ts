import { getComputedResults } from '@/helpers/simulation/getComputedResults'
import { useSimulation } from '@/publicodes-state'
import { Group } from '@/types/groups'

export function useFixComputedResults(group?: Group) {
  const { categories, safeEvaluate } = useSimulation()
  if (!group) return group

  const participantsWithFixedComputedResults = group.participants.map(
    (participant) => {
      if (participant.simulation.computedResults?.bilan !== 0) {
        return participant
      }

      const participantWithFixedComputedResults = {
        ...participant,
        simulation: {
          ...participant.simulation,
          computedResults: getComputedResults(categories, safeEvaluate),
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
