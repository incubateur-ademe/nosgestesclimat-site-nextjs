import { useEngine, useUser } from '@/publicodes-state'
import { useEffect } from 'react'
import { fetchUpdateGroupMember } from '../../_helpers/fetchUpdateGroupMember'
import { getSimulationResults } from '../../_helpers/getSimulationResults'
import { useFetchGroup } from '../../_hooks/useFetchGroup'

export const useUpdateUserResults = ({
  setIsSynced,
  groupId,
}: {
  setIsSynced: (value: boolean) => void
  groupId: string
}) => {
  const { getValue } = useEngine()

  const { user, getCurrentSimulation } = useUser()

  const { data: group, refetch } = useFetchGroup(groupId)

  const currentSimulation = getCurrentSimulation()

  const resultsOfUser = getSimulationResults({
    getValue,
  })

  // If the user has a simulation we update the group accordingly
  // This is flaky and should incorporate a failsafe to ensure we do not update ad aeternam
  useEffect(() => {
    const currentMember = group?.members.find(
      (groupMember: { userId: string }) => groupMember.userId === user?.id
    )

    if (group && currentMember && currentSimulation) {
      if (resultsOfUser?.total !== currentMember?.results?.total) {
        fetchUpdateGroupMember({
          group,
          userId: user?.id ?? '',
          simulation: currentSimulation,
          results: resultsOfUser,
        }).then(() => refetch())
      } else {
        setIsSynced(true)
      }
    }
  }, [group, user?.id, resultsOfUser, currentSimulation, refetch, setIsSynced])
}
