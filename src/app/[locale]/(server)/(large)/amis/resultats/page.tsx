'use client'

import GroupLoader from '@/components/groups/GroupLoader'
import GroupNotFound from '@/components/groups/GroupNotFound'
import { MON_ESPACE_GROUPS_PATH } from '@/constants/urls/paths'
import GoBackLink from '@/design-system/inputs/GoBackLink'
import { useFetchGroup } from '@/hooks/groups/useFetchGroup'
import { useGroupIdInQueryParams } from '@/hooks/groups/useGroupIdInQueryParams'
import { useGroupPagesGuard } from '@/hooks/navigation/useGroupPagesGuard'
import EditableGroupTitle from './_components/EditableGroupTitle'
import GroupResults from './_components/GroupResults'
import UpdateSimulationUsed from './_components/UpdateSimulationUsed'

export default function GroupResultsPage() {
  // Guarding the route and redirecting if necessary
  const { isGuardRedirecting } = useGroupPagesGuard({
    isDashboard: true,
  })

  const { groupIdInQueryParams } = useGroupIdInQueryParams()
  const {
    data: group,
    isLoading,
    isError,
    refetch: refetchGroup,
  } = useFetchGroup(groupIdInQueryParams)
  // If we are still fetching the group (or we are redirecting the user), we display a loader
  if (isGuardRedirecting || isLoading) {
    return <GroupLoader />
  }

  // If the group doesn't exist, we display a 404 page
  if (!group || isError) {
    return <GroupNotFound />
  }

  return (
    <div className="pb-8">
      <GoBackLink className="mb-4 font-bold" href={MON_ESPACE_GROUPS_PATH} />

      <EditableGroupTitle group={group} />

      <UpdateSimulationUsed group={group} refetchGroup={refetchGroup} />

      <GroupResults group={group} refetchGroup={refetchGroup} />
    </div>
  )
}
