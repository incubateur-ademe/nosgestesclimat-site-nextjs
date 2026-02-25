import { ORGANISATION_URL } from '@/constants/urls/main'
import { getModelVersion } from '@/helpers/modelFetching/getModelVersion'
import { postSimulation } from '@/helpers/simulation/postSimulation'
import { sanitizeSimulation } from '@/helpers/simulation/sanitizeSimulation'
import type { Locale } from '@/i18nConfig'
import { useUser } from '@/publicodes-state'
import type { Simulation } from '@/publicodes-state/types'
import { updateGroupParticipant } from '@/services/groups/updateGroupParticipant'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useLocale } from '../useLocale'
import { useBackgroundSyncSimulation } from './useBackgroundSyncSimulation'

interface Props {
  simulation: Simulation
  sendEmail?: true
  email?: string
  code?: string
}

export function useSaveSimulation() {
  const {
    user: { userId, name, email },
  } = useUser()
  const locale = useLocale()

  const { resetSyncTimer } = useBackgroundSyncSimulation()

  const {
    mutate: saveSimulationMutation,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({
      simulation,
      sendEmail,
    }: Props): Promise<Simulation | undefined> => {
      // We reset the sync timer to avoid saving the simulation in the background
      resetSyncTimer()

      const modelVersion = await getModelVersion()

      const { groups = [], polls = [] } = simulation

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

      // Strip unrecognized keys before mapping and posting
      const sanitizedSimulation = sanitizeSimulation(simulation)

      if (polls?.length) {
        const payload = {
          ...sanitizedSimulation,
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

        return axios
          .post(
            `${ORGANISATION_URL}/${userId}/public-polls/${polls[polls.length - 1].slug}/simulations`,
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
        simulation: sanitizedSimulation,
        userId,
        sendEmail,
        locale: locale as Locale,
      })
    },
  })

  return {
    saveSimulation: saveSimulationMutation,
    isPending,
    isSuccess,
    isError,
    error,
  }
}
