import { GROUP_URL } from '@/constants/urls'
import { useUser } from '@/publicodes-state'
import { Simulation } from '@/publicodes-state/types'
import { Group } from '@/types/groups'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export function useUpdateGroup() {
  const { user, getCurrentSimulation } = useUser()
  const currentSimulation = getCurrentSimulation()

  const { mutateAsync: updateGroupMember } = useMutation({
    mutationFn: ({
      group,
      userId,
      simulation,
    }: {
      group: Group
      userId: string
      simulation?: Simulation
    }) =>
      axios
        .post(`${GROUP_URL}/update-member`, {
          _id: group._id,
          memberUpdates: {
            userId,
            simulation,
          },
        })
        .then((response) => response.data),
  })

  async function handleUpdateGroup({ group }: { group: Group }) {
    const groupId = group?._id

    await updateGroupMember({
      group,
      userId: user?.userId ?? '',
      simulation: currentSimulation,
    })

    return { groupId }
  }

  return { handleUpdateGroup }
}
