'use client'

import { GROUP_URL } from '@/constants/urls'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export const useDeleteGroup = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ groupId, userId }: { groupId: string; userId: string }) =>
      axios.post(`${GROUP_URL}/delete`, {
        groupId,
        userId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['group'] })
    },
  })
}
