'use client'

import GroupLoader from '@/components/groups/GroupLoader'
import { classementCreateGroup } from '@/constants/tracking/pages/classements'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Title from '@/design-system/layout/Title'
import { linkToGroupCreation } from '@/helpers/navigation/groupPages'
import { useFetchGroupsOfUser } from '@/hooks/groups/useFetchGroupsOfUser'
import GroupContent from './groups/GroupContent'

export default function Groups() {
  const { data: groups, isLoading, isError } = useFetchGroupsOfUser()

  if (isLoading) {
    return <GroupLoader />
  }

  return (
    <>
      <div className="flex items-baseline justify-between">
        <Title
          tag="h2"
          title={<NGCTrans>Groupes d'amis</NGCTrans>}
          subtitle={
            <NGCTrans>
              Comparez vos résultats avec votre famille ou un groupe d’ami·e·s
            </NGCTrans>
          }
        />

        {groups && groups.length > 0 && (
          <ButtonLink
            href={linkToGroupCreation}
            trackingEvent={classementCreateGroup}
            color="secondary"
            size="sm"
            data-cypress-id="button-create-other-group">
            <NGCTrans>Créer un autre groupe</NGCTrans>
          </ButtonLink>
        )}
      </div>

      <GroupContent isError={isError} groups={groups} />
    </>
  )
}
