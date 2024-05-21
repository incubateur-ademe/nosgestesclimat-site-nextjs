import { SAVE_SIMULATION_URL } from '@/constants/urls'
import { useUser } from '@/publicodes-state'
import { Simulation } from '@/publicodes-state/types'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useBackgroundSyncSimulation } from './useBackgroundSyncSimulation'

type Props = {
  simulation: Simulation
  shouldSendSimulationEmail?: boolean
  listIds?: number[]
}
export function useSaveSimulation() {
  const { user } = useUser()

  const { resetSyncTimer } = useBackgroundSyncSimulation()

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
      listIds,
    }: Props) => {
      // We reset the sync timer to avoid saving the simulation in the background
      resetSyncTimer()

      // We duplicate the simulation to avoid modifying the original object
      const simulation = { ...originalSimulation }

      return axios
        .post(SAVE_SIMULATION_URL, {
          simulation,
          userId: user.userId,
          email: user.email,
          name: user.name,
          shouldSendSimulationEmail,
          listIds,
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
