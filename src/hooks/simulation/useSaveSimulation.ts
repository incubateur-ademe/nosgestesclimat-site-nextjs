import { SAVE_SIMULATION_URL } from '@/constants/urls'
import { useUser } from '@/publicodes-state'
import { Simulation } from '@/publicodes-state/types'
import { formatSituation } from '@/utils/formatDataForDB'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type Props = {
  simulation: Simulation
  shouldSendSimulationEmail?: boolean
}
export function useSaveSimulation() {
  const { user } = useUser()

  const {
    mutateAsync: saveSimulation,
    mutate: saveSimulationNotAsync,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: ({
      simulation: originalSimulation,
      shouldSendSimulationEmail = false,
    }: Props) => {
      // We duplicate the simulation to avoid modifying the original object
      const simulation = { ...originalSimulation }

      // We need to format the situation to be saved in the database
      simulation.situation = formatSituation(simulation.situation)

      return axios
        .post(SAVE_SIMULATION_URL, {
          simulation,
          userId: user.userId,
          email: user.email,
          name: user.name,
          shouldSendSimulationEmail,
        })
        .then((response) => response.data)
        .catch(() => console.error('Failed to save simulation'))
    },
  })
  return {
    saveSimulation,
    saveSimulationNotAsync,
    isPending,
    isSuccess,
    isError,
    error,
  }
}
