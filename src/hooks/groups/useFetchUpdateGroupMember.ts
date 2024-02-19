import { GROUP_URL } from '@/constants/urls'
import { Simulation } from '@/publicodes-state/types'
import { Group } from '@/types/groups'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type Props = {
  group: Group
  userId: string
  simulation?: Simulation
  email?: string
}

export const useFetchUpdateGroupMember = () => {
  return useMutation({
    mutationFn: ({ group, userId, simulation, email }: Props) =>
      axios
        .post(`${GROUP_URL}/update-participant`, {
          _id: group._id,
          userId,
          email,
          simulation,
        })
        .then((response) => response.data),
  })
}
