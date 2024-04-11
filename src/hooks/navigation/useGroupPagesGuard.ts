import { linkToClassement } from '@/helpers/navigation/classementPages'
import {
  getLinkToGroupDashboard,
  getLinkToGroupInvitation,
} from '@/helpers/navigation/groupPages'
import { useFetchGroup } from '@/hooks/groups/useFetchGroup'
import { useGroupIdInQueryParams } from '@/hooks/groups/useGroupIdInQueryParams'
import { useDebug } from '@/hooks/useDebug'
import { useUser } from '@/publicodes-state'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type Props = {
  isDashboard?: boolean
}
export function useGroupPagesGuard(
  { isDashboard }: Props = { isDashboard: false }
) {
  const router = useRouter()

  const { user } = useUser()

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

    // If there is no groupId in the query params, we redirect to the classement page
    if (!groupIdInQueryParams) {
      router.replace(linkToClassement)
      setIsGuardRedirecting(true)
      return
    }

    // If we are on the dashboard and the user is not a part of the group, we redirect to the invitation page
    if (
      isDashboard &&
      group &&
      !group?.participants?.some(
        (participant: { userId: string }) => participant.userId === user.userId
      )
    ) {
      router.replace(getLinkToGroupInvitation({ group }))
      setIsGuardRedirecting(true)
      return
    }

    // If we are not on the dashboard and the user is a part of the group, we redirect to the dashboard
    if (
      !isDashboard &&
      group &&
      group?.participants?.some(
        (participant: { userId: string }) => participant.userId === user.userId
      )
    ) {
      router.replace(getLinkToGroupDashboard({ group }))
      setIsGuardRedirecting(true)
      return
    }
  }, [
    isDashboard,
    isGuardInit,
    groupIdInQueryParams,
    router,
    isDebug,
    group,
    user,
    isFetching,
  ])

  return { isGuardInit, isGuardRedirecting }
}
