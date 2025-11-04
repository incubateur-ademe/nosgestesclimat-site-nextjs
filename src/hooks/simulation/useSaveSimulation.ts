import { ORGANISATION_URL } from '@/constants/urls/main'
import { getModelVersion } from '@/helpers/modelFetching/getModelVersion'
import { mapOldSimulationToNew } from '@/helpers/simulation/mapNewSimulation'
import { saveSimulation as saveSimulationHelper } from '@/helpers/simulation/saveSimulation'
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
  email?: string
  code?: string
}
export function useSaveSimulation() {
  const {
    user: { userId, name },
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
      simulation,
      sendEmail,
      email,
      code,
    }: Props): Promise<Simulation> => {
      // We reset the sync timer to avoid saving the simulation in the background
      resetSyncTimer()

      const modelVersion = await getModelVersion()

      const groups = (simulation as any).groups as string[] | undefined
      const polls = (simulation as any).polls as string[] | undefined

      if (groups?.length) {
        return updateGroupParticipant({
          groupId: groups[groups.length - 1],
          email,
          simulation: {
            ...(simulation as any),
            model: modelVersion,
          },
          userId,
          name,
        }).then((response) => response.data.simulation)
      }

      // Strip unrecognized keys before mapping and posting
      const sanitized: any = { ...(simulation as any) }
      delete sanitized.createdAt
      delete sanitized.updatedAt
      delete sanitized.user

      const payload = {
        ...mapOldSimulationToNew(sanitized),
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

      return saveSimulationHelper({
        simulation,
        userId,
        email,
        name,
        code,
        sendEmail,
      })
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
