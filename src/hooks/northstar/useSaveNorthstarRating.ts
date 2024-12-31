import { NORTHSTAR_RATING_URL } from '@/constants/urls'
import { useCurrentSimulation } from '@/publicodes-state'
import type { NorthStarValue } from '@/types/northstar'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type Props = {
  value: NorthStarValue
  type: string
}
export function useSaveNorthstarRating() {
  const { id } = useCurrentSimulation()

  const northStarMutation = useMutation({
    mutationFn: ({ value, type }: Props) => {
      return axios
        .post(NORTHSTAR_RATING_URL, {
          value,
          type,
          simulationId: id,
        })
        .then((response) => response.data)
    },
  })

  return {
    ...northStarMutation,
    saveNorthstarRating: northStarMutation.mutateAsync,
  }
}
