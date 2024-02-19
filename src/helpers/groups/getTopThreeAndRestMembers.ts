import { Participant } from '@/types/groups'

export const getTopThreeAndRestMembers = (members: Participant[] = []) => {
  const sortedMembers = members.sort((memberA, memberB) => {
    const totalA = memberA?.simulation.computedResults?.bilan
    const totalB = memberB?.simulation.computedResults?.bilan

    return totalA !== undefined && totalB !== undefined ? totalA - totalB : -1
  })

  return sortedMembers.reduce(
    (acc, member, index) => {
      if (
        index < 3 &&
        member?.simulation?.computedResults?.bilan !== undefined
      ) {
        acc.topThreeMembers.push(member)
      } else {
        acc.restOfMembers.push(member)
      }
      return acc
    },
    { topThreeMembers: [], restOfMembers: [] } as {
      topThreeMembers: Participant[]
      restOfMembers: Participant[]
    }
  )
}
