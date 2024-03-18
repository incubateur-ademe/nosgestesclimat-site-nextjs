import { GROUP_URL } from '@/constants/urls'
import { Simulation } from '@/publicodes-state/types'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type MutateAsyncProps = {
  groupInfo: {
    name: string
    emoji: string
    administratorEmail: string
    administratorName: string
    userId: string
    simulation?: Simulation
  }
}

export function useCreateGroup() {
  return useMutation({
    mutationFn: ({
      groupInfo: {
        name,
        emoji,
        administratorEmail,
        administratorName,
        userId,
        simulation,
      },
    }: MutateAsyncProps) =>
      axios
        .post(GROUP_URL + '/create', {
          name,
          emoji,
          administratorEmail,
          administratorName,
          userId,
          simulation,
        })
        .then((res) => res.data),
  })
}
