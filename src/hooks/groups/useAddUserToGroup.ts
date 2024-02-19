import { fetchAddUserToGroup } from '@/helpers/groups/fetchAddUserToGroup'
import { Simulation } from '@/publicodes-state/types'
import { Group } from '@/types/groups'
import { useMutation } from '@tanstack/react-query'

type MutationFnType = {
  group: Group
  prenom: string
  email: string
  userId?: string
  simulation?: Simulation
}

export const useAddUserToGroup = () => {
  return useMutation({
    mutationFn: ({
      group,
      prenom,
      email,
      userId,
      simulation,
    }: MutationFnType) =>
      fetchAddUserToGroup({
        group,
        name: prenom,
        email,
        userId: userId ?? '',
        simulation,
      }),
  })
}
