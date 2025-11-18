import { ORGANISATION_URL } from '@/constants/urls/main'
import { getModelVersion } from '@/helpers/modelFetching/getModelVersion'
import {
  mapNewSimulationToOld,
  mapOldSimulationToNew,
} from '@/helpers/simulation/mapNewSimulation'
import { postSimulation } from '@/helpers/simulation/postSimulation'
import { useUser } from '@/publicodes-state'
import type { Simulation } from '@/publicodes-state/types'
import { updateGroupParticipant } from '@/services/groups/updateGroupParticipant'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useLocale } from '../useLocale'
import { useBackgroundSyncSimulation } from './useBackgroundSyncSimulation'

type Props = {
  simulation: Simulation
  sendEmail?: true
}

export function useSaveSimulation() {
  const {
    user: { userId, name, email },
  } = useUser()
  const locale = useLocale()

  const { resetSyncTimer } = useBackgroundSyncSimulation()

  const {
    mutate: saveSimulation,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({
      simulation: { groups, polls, ...simulation },
      sendEmail,
    }: Props) => {
      // We reset the sync timer to avoid saving the simulation in the background
      resetSyncTimer()

      const modelVersion = await getModelVersion()

      if (groups?.length) {
        return updateGroupParticipant({
          groupId: groups[groups.length - 1],
          email,
          simulation: {
            ...simulation,
            model: modelVersion,
          },
          userId,
          name,
        }).then((response) => response.data.simulation)
      }

      const payload = {
        ...mapOldSimulationToNew(simulation),
        model: modelVersion,
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
            payload,
            {
              params: {
                locale,
              },
            }
          )
          .then((response) => response.data)
      }

      return postSimulation({
        simulation: payload,
        userId,
        sendEmail,
      }).then((response) => mapNewSimulationToOld(response.data))
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
