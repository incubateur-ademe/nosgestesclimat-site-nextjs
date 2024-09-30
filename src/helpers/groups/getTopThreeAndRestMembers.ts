import { defaultMetric } from '@/constants/metric'
import { Participant } from '@/types/groups'

export const getTopThreeAndRestMembers = (members: Participant[] = []) => {
  const sortedMembers = members.sort((memberA, memberB) => {
    const totalA = memberA?.simulation?.computedResults?.[defaultMetric]?.bilan
    const totalB = memberB?.simulation?.computedResults?.[defaultMetric]?.bilan

    return totalA !== undefined && totalB !== undefined ? totalA - totalB : -1
  })

  return sortedMembers.reduce(
    (acc, member, index) => {
      // We store apart the members with uncompleted simulations
      if (member.simulation.progression !== 1) {
        acc.membersWithUncompletedSimulations.push(member)
        return acc
      }

      if (
        index < 3 &&
        member?.simulation?.computedResults?.[defaultMetric]?.bilan !==
          undefined
      ) {
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
