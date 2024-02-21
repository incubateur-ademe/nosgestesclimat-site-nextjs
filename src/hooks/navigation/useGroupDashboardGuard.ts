import { linkToClassement } from '@/helpers/navigation/classementPages'
import { useUser } from '@/publicodes-state'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useFetchGroup } from '../groups/useFetchGroup'
import { useGroupIdInQueryParams } from '../groups/useGroupIdInQueryParams'
import { useDebug } from '../useDebug'

export function useGroupDashboardGuard() {
  const router = useRouter()

  const { user, getCurrentSimulation } = useUser()
  const currentSimulation = getCurrentSimulation()

  const isDebug = useDebug()

  const { groupIdInQueryParams } = useGroupIdInQueryParams()

  const { data: group, isFetching } = useFetchGroup(groupIdInQueryParams)

  const [isGuardInit, setIsGuardInit] = useState(false)
  const [isGuardRedirecting, setIsGuardRedirecting] = useState(false)

  useEffect(() => {
    // we only run the guard when the group is fetched (or failed fetching)
    if (isFetching) return

    // we only run the guard once
    if (isGuardInit) return
    setIsGuardInit(true)

    if (!currentSimulation) {
      router.push('/404') // TODO: should throw an error
      setIsGuardRedirecting(true)
      return
    }

    // If there is no groupId in the query params, we redirect to the classement page
    if (!groupIdInQueryParams) {
      router.push(linkToClassement)
      setIsGuardRedirecting(true)
      return
    }

    // If there is a group but the user is not part of it, we redirect to the invitation page
    if (
      group &&
      !group?.participants?.some(
        (participant: { userId: string }) => participant.userId === user.userId
      )
    ) {
      router.push(`/amis/invitation?groupId=${group?._id}`)
      setIsGuardRedirecting(true)
      return
    }
  }, [
    isGuardInit,
    groupIdInQueryParams,
    currentSimulation,
    router,
    isDebug,
    group,
    user,
    isFetching,
  ])

  return { isGuardInit, isGuardRedirecting }
}
