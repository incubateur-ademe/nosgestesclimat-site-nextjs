import { GROUP_URL, ORGANISATION_URL, SIMULATION_URL } from '@/constants/urls'
import {
  mapNewSimulationToOld,
  mapOldSimulationToNew,
} from '@/helpers/simulation/mapNewSimulation'
import { useUser } from '@/publicodes-state'
import type { Simulation } from '@/publicodes-state/types'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useBackgroundSyncSimulation } from './useBackgroundSyncSimulation'

type Props = {
  simulation: Simulation
  newsletters?: number[]
  sendEmail?: true
}
export function useSaveSimulation() {
  const {
    user: { userId, name, email },
  } = useUser()

  const { resetSyncTimer } = useBackgroundSyncSimulation()

  const {
    mutate: saveSimulation,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: ({
      simulation: {
        groups,
        polls,

        ...simulation
      },
      newsletters,
      sendEmail,
    }: Props) => {
      // We reset the sync timer to avoid saving the simulation in the background
      resetSyncTimer()

      if (groups?.length) {
        return axios
          .post(`${GROUP_URL}/${groups[groups.length - 1]}/participants`, {
            ...(email ? { email } : {}),
            simulation,
            userId,
            name,
          })
          .then((response) => response.data.simulation)
      }

      const payload = {
        ...mapOldSimulationToNew(simulation),
        ...(name || email
          ? {
              user: {
                ...(email ? { email } : {}),
                ...(name ? { name } : {}),
              },
            }
          : {}),
      }

      if (polls?.length) {
        return axios
          .post(
            `${ORGANISATION_URL}/${userId}/public-polls/${polls[polls.length - 1]}/simulations`,
            payload
          )
          .then((response) => response.data)
      }

      return axios
        .post(`${SIMULATION_URL}/${userId}`, payload, {
          params: { newsletters, sendEmail },
        })
        .then((response) => mapNewSimulationToOld(response.data))
    },
  })
  return {
    saveSimulation,
    isPending,
    isSuccess,
    isError,
    error,
  }
}
