import { GROUP_URL } from '@/constants/urls'
import { Simulation } from '@/publicodes-state/types'
import { SimulationResults } from '@/types/groups'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type MutateAsyncProps = {
  groupInfo: {
    name: string
    emoji: string
    email: string
    prenom: string
    userId: string
    simulation?: Simulation
  }
  results: SimulationResults
}

export default function useCreateGroup() {
  return useMutation({
    mutationFn: ({
      groupInfo: { name, emoji, email, prenom, userId, simulation },
      results,
    }: MutateAsyncProps) =>
      axios
        .post(GROUP_URL + '/create', {
          name: name,
          emoji: emoji,
          ownerEmail: email,
          ownerName: prenom,
          userId,
          simulation,
          results,
        })
        .then((res) => res.data),
  })
}
