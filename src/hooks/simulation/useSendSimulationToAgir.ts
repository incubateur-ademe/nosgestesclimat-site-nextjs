import { SERVER_URL } from '@/constants/urls'
import { useCurrentSimulation } from '@/publicodes-state'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export function useSendSimulationToAgir() {
  const currentSimulation = useCurrentSimulation()

  const {
    mutate: sendSimulation,
    isPending,
    isSuccess,
    isError,
    error,
    data,
  } = useMutation({
    mutationFn: () => {
      return axios
        .post(
          `${SERVER_URL}/integrations/v1/agir/export-situation`,
          currentSimulation.situation
        )
        .then((response) => response.data)
    },
  })
  return {
    sendSimulation,
    isPending,
    isSuccess,
    isError,
    error,
    data,
  }
}
