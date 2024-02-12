'use client'

import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { useUser } from '@/publicodes-state'
import { useFetchGroups } from '../../amis/_hooks/usFetchGroups'
import CreateFirstGroupSection from './groups/CreateFirstGroupSection'
import CreateOtherGroupsSection from './groups/CreateOtherGroupsSection'
import ServerErrorSection from './groups/ServerErrorSection'

export default function Groups() {
  const { getCurrentSimulation, user } = useUser()

  const currentSimulation = getCurrentSimulation()

  const { data: groups, isFetched } = useFetchGroups(user?.id)
  
  return (
    <>
      <Title
        title={<Trans>Groupe d'amis</Trans>}
        subtitle={
          <Trans>
            Comparez vos résultats avec votre famille ou un groupe d’ami·e·s
          </Trans>
        }
      />
      {isFetched && !groups && <ServerErrorSection />}

      {groups && groups?.length === 0 && <CreateFirstGroupSection />}

      {currentSimulation && groups && groups?.length > 0 && (
        <CreateOtherGroupsSection groups={groups} />
      )}
    </>
  )
}
