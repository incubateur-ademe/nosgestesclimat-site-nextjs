'use client'

import { GROUP_URL } from '@/constants/urls'
import { useUser } from '@/publicodes-state'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export function useRemoveParticipant() {
  const { updateCurrentSimulation } = useUser()
  return useMutation({
    mutationFn: ({ groupId, userId }: { groupId: string; userId: string }) =>
      axios.post(`${GROUP_URL}/remove-participant`, {
        groupId,
        userId,
      }),
    onSuccess: () => {
      updateCurrentSimulation({ group: null })
    },
  })
}
