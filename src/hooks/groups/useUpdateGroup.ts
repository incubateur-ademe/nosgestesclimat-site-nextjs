import { getSimulationResults } from '@/app/(layout-with-navigation)/(simulation)/amis/_helpers/getSimulationResults'
import { GROUP_URL } from '@/constants/urls'
import { useEngine, useUser } from '@/publicodes-state'
import { Simulation } from '@/publicodes-state/types'
import { Group, SimulationResults } from '@/types/groups'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export function useUpdateGroup() {
  const { user, getCurrentSimulation } = useUser()
  const currentSimulation = getCurrentSimulation()

  const { getValue } = useEngine()

  const { mutateAsync: updateGroupMember } = useMutation({
    mutationFn: ({
      group,
      userId,
      simulation,
      results,
    }: {
      group: Group
      userId: string
      simulation?: Simulation
      results: SimulationResults
    }) =>
      axios
        .post(`${GROUP_URL}/update-member`, {
          _id: group._id,
          memberUpdates: {
            userId,
            simulation,
            results,
          },
        })
        .then((response) => response.data),
  })

  async function handleUpdateGroup({ group }: { group: Group }) {
    const groupId = group?._id

    const results = getSimulationResults({
      getValue,
    })

    await updateGroupMember({
      group,
      userId: user?.id ?? '',
      simulation: currentSimulation,
      results,
    })

    return { groupId }
  }

  return { handleUpdateGroup }
}
