import { fetchAddUserToGroup } from '@/helpers/groups/fetchAddUserToGroup'
import { Simulation } from '@/publicodes-state/types'
import { Group, SimulationResults } from '@/types/groups'
import { useMutation } from '@tanstack/react-query'

type MutationFnType = {
  group: Group
  prenom: string
  email: string
  userId?: string
  computedResults: SimulationResults
  simulation?: Simulation
}

export const useAddUserToGroup = () => {
  return useMutation({
    mutationFn: ({
      group,
      prenom,
      email,
      userId,
      computedResults,
      simulation,
    }: MutationFnType) =>
      fetchAddUserToGroup({
        group,
        name: prenom,
        email,
        userId: userId ?? '',
        simulation,
        computedResults,
      }),
  })
}
