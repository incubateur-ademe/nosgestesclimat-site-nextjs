import { getSimulationResults } from '@/app/(layout-with-navigation)/(simulation)/amis/_helpers/getSimulationResults'
import { getMatomoEventJoinedGroupe } from '@/constants/matomo'
import { useEngine, useUser } from '@/publicodes-state'
import { Group } from '@/types/groups'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useRouter } from 'next/navigation'
import { useFetchUpdateGroupMember } from './useFetchUpdateGroupMember'

export function useUpdateGroupAndRedirectToGroup() {
  const { setGroupToRedirectToAfterTest, user, getCurrentSimulation } =
    useUser()

  const { getValue } = useEngine()

  const router = useRouter()

  const { mutateAsync: updateGroupMember } = useFetchUpdateGroupMember()

  async function handleUpdateGroupAndRedirectToGroup({
    group,
  }: {
    group: Group
  }) {
    const groupId = group?._id

    setGroupToRedirectToAfterTest(undefined)

    const results = getSimulationResults({
      getValue,
    })

    if (group?.owner?._id === user?.id) {
      await updateGroupMember({
        group,
        userId: user?.id ?? '',
        simulation: getCurrentSimulation(),
        results,
      })

      trackEvent(getMatomoEventJoinedGroupe(group?._id || ''))
    } else {
      trackEvent(getMatomoEventJoinedGroupe(groupId))
    }

    router.push(`/amis/resultats?groupId=${groupId}`)
  }

  return handleUpdateGroupAndRedirectToGroup
}
