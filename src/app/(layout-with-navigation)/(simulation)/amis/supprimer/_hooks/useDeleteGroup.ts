'use client'

import { GROUP_URL } from '@/constants/urls'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, useRef } from 'react'

export function useDeleteGroup(skipInvalidate: boolean = false) {
  const queryClient = useQueryClient()

  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef?.current || '')
    }
  }, [])

  return useMutation({
    mutationFn: ({ groupId, userId }: { groupId: string; userId: string }) =>
      axios.post(`${GROUP_URL}/delete`, {
        groupId,
        userId,
      }),
    onSuccess: () => {
      if (skipInvalidate) return

      timeoutRef.current = setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['group'] })
      }, 2000)
    },
  })
}
