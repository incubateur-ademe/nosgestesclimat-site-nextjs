import { GROUP_URL } from '@/constants/urls'
import { Simulation } from '@/publicodes-state/types'
import { Group, SimulationResults } from '@/types/groups'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type Props = {
  group: Group
  userId: string
  simulation?: Simulation
  computedResults: SimulationResults
  email?: string
}

export const useFetchUpdateGroupMember = () => {
  return useMutation({
    mutationFn: ({
      group,
      userId,
      simulation,
      computedResults,
      email,
    }: Props) =>
      axios
        .post(`${GROUP_URL}/update-participant`, {
          _id: group._id,
          userId,
          email,
          simulation: {
            ...simulation,
            computedResults,
          },
        })
        .then((response) => response.data),
  })
}
