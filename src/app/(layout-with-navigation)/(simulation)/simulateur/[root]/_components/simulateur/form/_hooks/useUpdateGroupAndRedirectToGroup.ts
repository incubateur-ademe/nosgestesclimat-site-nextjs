import { getSimulationResults } from '@/app/(layout-with-navigation)/(simulation)/amis/_helpers/getSimulationResults'
import { useEngine, useUser } from '@/publicodes-state'
import { Group } from '@/types/groups'
import { useRouter } from 'next/navigation'
import { useFetchUpdateGroupMember } from './useFetchUpdateGroupMember'

export function useUpdateGroupAndRedirectToGroup() {
  const { user, getCurrentSimulation } = useUser()

  const { getValue } = useEngine()

  const router = useRouter()

  const { mutateAsync: updateGroupMember } = useFetchUpdateGroupMember()

  async function handleUpdateGroupAndRedirectToGroup({
    group,
  }: {
    group: Group
  }) {
    const groupId = group?._id

    const results = getSimulationResults({
      getValue,
    })

    await updateGroupMember({
      group,
      userId: user?.id ?? '',
      simulation: getCurrentSimulation(),
      results,
    })

    router.push(`/amis/resultats?groupId=${groupId}`)
  }

  return handleUpdateGroupAndRedirectToGroup
}
