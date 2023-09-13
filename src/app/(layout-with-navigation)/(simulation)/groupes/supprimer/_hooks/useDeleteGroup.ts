import { GROUP_URL } from '@/constants/urls'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useDeleteGroup = () => {
  return useMutation({
    mutationFn: ({ groupId, userId }: { groupId: string; userId: string }) =>
      axios.post(`${GROUP_URL}/delete`, {
        groupId,
        userId,
      }),
  })
}
