'use client'

import GroupLoader from '@/components/groups/GroupLoader'
import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { useFetchGroupsOfUser } from '@/hooks/groups/useFetchGroupsOfUser'
import CreateFirstGroupSection from './groups/CreateFirstGroupSection'
import CreateOtherGroupsSection from './groups/CreateOtherGroupsSection'
import ServerErrorSection from './groups/ServerErrorSection'

export default function Groups() {
  const { data: groups, isLoading, isError } = useFetchGroupsOfUser()

  if (isLoading) {
    return <GroupLoader />
  }

  return (
    <>
      <Title
        title={<Trans>Groupes d'amis</Trans>}
        subtitle={
          <Trans>
            Comparez vos résultats avec votre famille ou un groupe d’ami·e·s
          </Trans>
        }
      />

      {isError ? (
        <ServerErrorSection />
      ) : !groups || groups?.length === 0 ? (
        <CreateFirstGroupSection />
      ) : (
        <CreateOtherGroupsSection groups={groups} />
      )}
    </>
  )
}
