import { useFetchUpdateGroupMember } from '@/hooks/groups/useFetchUpdateGroupMember'
import { useUser } from '@/publicodes-state'
import { useEffect } from 'react'
import { useFetchGroup } from './useFetchGroup'

export const useUpdateUserResults = ({
  setIsSynced,
  groupId,
}: {
  setIsSynced: (value: boolean) => void
  groupId: string
}) => {
  const { user, getCurrentSimulation } = useUser()

  const { data: group, refetch } = useFetchGroup(groupId)

  const currentSimulation = getCurrentSimulation()

  const { mutateAsync: updateGroupMember } = useFetchUpdateGroupMember()

  // If the user has a simulation we update the group accordingly
  // This is flaky and should incorporate a failsafe to ensure we do not update ad aeternam
  useEffect(() => {
    const currentMember = group?.participants?.find(
      (groupMember: { userId: string }) => groupMember.userId === user?.userId
    )

    if (group && currentMember && currentSimulation) {
      if (
        currentSimulation?.computedResults?.bilan !==
        currentMember?.simulation?.computedResults?.bilan
      ) {
        updateGroupMember({
          group,
          userId: user?.userId ?? '',
          email: user?.email,
          simulation: currentSimulation,
        }).then(() => refetch())
      } else {
        setIsSynced(true)
      }
    }
  }, [
    group,
    user?.userId,
    user?.email,
    currentSimulation,
    refetch,
    setIsSynced,
    updateGroupMember,
  ])
}
