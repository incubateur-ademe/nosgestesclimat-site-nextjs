import { GROUP_URL } from '@/constants/urls'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

type MutationFnType = {
  groupId: string
  groupName: string
}

export const useUpdateGroupName = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ groupId, groupName }: MutationFnType) =>
      axios.post(GROUP_URL + '/update', {
        _id: groupId,
        name: groupName,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['group'] })
    },
  })
}
