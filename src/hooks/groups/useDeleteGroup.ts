'use client'

import { GROUP_URL } from '@/constants/urls'
import { useUser } from '@/publicodes-state'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export function useDeleteGroup() {
  const { updateCurrentSimulation } = useUser()

  return useMutation({
    mutationFn: ({ groupId, userId }: { groupId: string; userId: string }) =>
      axios.post(`${GROUP_URL}/delete`, {
        groupId,
        userId,
      }),
    onSuccess: (data, variables) => {
      updateCurrentSimulation({ groupToDelete: variables.groupId })
    },
  })
}
