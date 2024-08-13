import { Participant } from '@/types/groups'
import { temp_getComputedResults } from '../simulation/temp_getComputedResults'

export const getTopThreeAndRestMembers = (members: Participant[] = []) => {
  console.log(members)
  const sortedMembers = members.sort((memberA, memberB) => {
    console.log(temp_getComputedResults(memberA?.simulation))
    const totalA = temp_getComputedResults(memberA?.simulation)?.bilan
    const totalB = temp_getComputedResults(memberB?.simulation)?.bilan

    return totalA !== undefined && totalB !== undefined ? totalA - totalB : -1
  })

  return sortedMembers.reduce(
    (acc, member, index) => {
      if (
        index < 3 &&
        temp_getComputedResults(member?.simulation)?.bilan !== undefined
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
