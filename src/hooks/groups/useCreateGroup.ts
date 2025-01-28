import { GROUP_URL } from '@/constants/urls'
import type { Group } from '@/types/groups'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

type MutateAsyncProps = {
  groupInfo: {
    name: string
    emoji: string
    administrator: {
      userId: string
      name: string
      email?: string
    }
  }
}

export function useCreateGroup() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      groupInfo: { name, emoji, administrator },
    }: MutateAsyncProps) =>
      axios
        .post<Group>(GROUP_URL, {
          name,
          emoji,
          administrator,
        })
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] })
    },
  })
}
