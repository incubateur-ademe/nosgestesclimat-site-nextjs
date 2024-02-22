import { GROUP_URL } from '@/constants/urls'
import { useUser } from '@/publicodes-state'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

type MutationFnType = {
  groupId: string
  name: string
}
export const useUpdateGroup = () => {
  const queryClient = useQueryClient()

  const { user } = useUser()

  return useMutation({
    mutationFn: ({ groupId, name }: MutationFnType) =>
      axios.post(GROUP_URL + '/update', {
        groupId,
        userId: user?.userId,
        name,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['group'] })
    },
  })
}
