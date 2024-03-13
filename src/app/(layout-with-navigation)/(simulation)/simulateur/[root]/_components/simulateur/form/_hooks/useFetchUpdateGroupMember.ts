import { GROUP_URL } from '@/constants/urls'
import { Simulation } from '@/publicodes-state/types'
import { Group, SimulationResults } from '@/types/groups'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type Props = {
  group: Group
  userId: string
  simulation?: Simulation
  results: SimulationResults
}

export const useFetchUpdateGroupMember = () => {
  return useMutation({
    mutationFn: ({ group, userId, simulation, results }: Props) =>
      axios
        .post(`${GROUP_URL}/update-member`, {
          _id: group._id,
          memberUpdates: {
            userId,
            simulation,
            results,
          },
        })
        .then((response) => response.data),
  })
}
