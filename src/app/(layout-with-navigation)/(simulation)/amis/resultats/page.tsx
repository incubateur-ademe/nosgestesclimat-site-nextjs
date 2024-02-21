'use client'

import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import GoBackLink from '@/design-system/inputs/GoBackLink'
import Loader from '@/design-system/layout/Loader'
import Title from '@/design-system/layout/Title'
import { linkToClassement } from '@/helpers/navigation/classementPages'
import { useFetchGroup } from '@/hooks/groups/useFetchGroup'
import { useGroupIdInQueryParams } from '@/hooks/groups/useGroupIdInQueryParams'
import { useGroupDashboardGuard } from '@/hooks/navigation/useGroupDashboardGuard'
import EditableGroupTitle from './_components/EditableGroupTitle'
import GroupResults from './_components/GroupResults'

export default function GroupResultsPage() {
  // Guarding the route and redirecting if necessary
  const { isGuardInit, isGuardRedirecting } = useGroupDashboardGuard()

  const { groupIdInQueryParams } = useGroupIdInQueryParams()
  const { data: group, isFetching } = useFetchGroup(groupIdInQueryParams)

  // If we are still fetching the group (or we are redirecting the user), we display a loader
  if (!isGuardInit || isGuardRedirecting || isFetching) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader className="border-gray-600 border-b-transparent" />
      </div>
    )
  }

  // Group doesn't exist
  if (!group) {
    return (
      <div className="flex flex-col items-start">
        <Title
          title={<Trans>Oups ! Nous n'avons pas trouvé votre groupe</Trans>}
        />

        <p className="mb-8 mt-2">
          <Trans>Ce groupe n'existe pas ou a été supprimé.</Trans>
        </p>

        <ButtonLink href={linkToClassement}>
          <Trans>Retour à la liste des groupes</Trans>
        </ButtonLink>
      </div>
    )
  }

  return (
    <div>
      <GoBackLink className="mb-4 font-bold" />

      <EditableGroupTitle group={group} />

      <GroupResults group={group} />
    </div>
  )
}
