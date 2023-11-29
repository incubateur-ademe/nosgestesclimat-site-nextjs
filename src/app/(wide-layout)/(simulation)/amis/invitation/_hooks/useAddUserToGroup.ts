import { Simulation } from '@/publicodes-state/types'
import { Group, SimulationResults } from '@/types/groups'
import { useMutation } from '@tanstack/react-query'
import { fetchAddUserToGroup } from '../../_helpers/fetchAddUserToGroup'

type MutationFnType = {
  group: Group
  prenom: string
  email: string
  userId?: string
  results: SimulationResults
  simulation?: Simulation
}

export const useAddUserToGroup = () => {
  return useMutation({
    mutationFn: ({
      group,
      prenom,
      email,
      userId,
      results,
      simulation,
    }: MutationFnType) =>
      fetchAddUserToGroup({
        group,
        name: prenom,
        email,
        userId: userId ?? '',
        simulation,
        results,
      }),
  })
}
