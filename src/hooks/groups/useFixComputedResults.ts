import { getComputedResults } from '@/helpers/simulation/getComputedResults'
import { useSimulation } from '@/publicodes-state'
import { Group } from '@/types/groups'
import { useRules } from '../useRules'

export function useFixComputedResults(group?: Group) {
  const { data: rules } = useRules()

  const { categories } = useSimulation()

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
          computedResults: getComputedResults({
            situation: participant.simulation.situation,
            categories,
            rules,
          }),
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
