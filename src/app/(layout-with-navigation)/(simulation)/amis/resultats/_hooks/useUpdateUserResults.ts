import { useEngine, useUser } from '@/publicodes-state'
import { useEffect } from 'react'
import { useFetchUpdateGroupMember } from '../../../simulateur/[root]/_components/simulateur/form/_hooks/useFetchUpdateGroupMember'
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

  const { mutateAsync: updateGroupMember } = useFetchUpdateGroupMember()

  const resultsOfUser = getSimulationResults({
    getValue,
  })

  // If the user has a simulation we update the group accordingly
  // This is flaky and should incorporate a failsafe to ensure we do not update ad aeternam
  useEffect(() => {
    const currentMember = group?.participants?.find(
      (groupMember: { userId: string }) => groupMember.userId === user?.userId
    )

    if (group && currentMember && currentSimulation) {
      if (
        resultsOfUser?.bilan !==
        String(currentMember?.simulation?.computedResults?.bilan)
      ) {
        updateGroupMember({
          group,
          userId: user?.userId ?? '',
          email: user?.email,
          simulation: currentSimulation,
          computedResults: resultsOfUser,
        }).then(() => refetch())
      } else {
        setIsSynced(true)
      }
    }
  }, [
    group,
    user?.userId,
    user?.email,
    resultsOfUser,
    currentSimulation,
    refetch,
    setIsSynced,
    updateGroupMember,
  ])
}
