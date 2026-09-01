import type { Participant } from '@/types/groups'
import type { Metrics } from '@incubateur-ademe/nosgestesclimat'
import { getParticipantFootprint } from './getParticipantFootprint'
import { sortParticipantsByFootprint } from './sortParticipantsByFootprint'

export const getTopThreeAndRestMembers = (
  members: Participant[] = [],
  metric: Metrics
) => {
  const sortedMembers = sortParticipantsByFootprint(members, metric)

  return sortedMembers.reduce(
    (acc, member, index) => {
      // We store apart the members with uncompleted simulations
      if (member.simulation.progression !== 1) {
        acc.membersWithUncompletedSimulations.push(member)
        return acc
      }

      if (index < 3 && getParticipantFootprint(member, metric) !== undefined) {
        acc.topThreeMembers.push(member)
      } else {
        acc.restOfMembers.push(member)
      }
      return acc
    },
    {
      topThreeMembers: [],
      restOfMembers: [],
      membersWithUncompletedSimulations: [],
    } as {
      topThreeMembers: Participant[]
      restOfMembers: Participant[]
      membersWithUncompletedSimulations: Participant[]
    }
  )
}
