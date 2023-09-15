'use client'

import Meta from '@/components/misc/Meta'
import Title from '@/design-system/layout/Title'
import AutoCanonicalTag from '@/design-system/utils/AutoCanonicalTag'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import CreateFirstGroupSection from './_components/CreateFirstGroupSection'
import CreateOtherGroupsSection from './_components/CreateOtherGroupsSection'
import NoSimulationSection from './_components/NoSimulationSection'
import ServerErrorSection from './_components/ServerErrorSection'
import { useFetchGroups } from './_hooks/usFetchGroups'
import FeedbackBlock from './resultats/_components/FeedbackBlock'
import SondagesBlock from './resultats/_components/SondagesBlock'

export default function GroupesPage() {
  const { t } = useClientTranslation()

  const { getCurrentSimulation, user } = useUser()

  const currentSimulation = getCurrentSimulation()
  console.log(user)
  const { data: groups, isFetched } = useFetchGroups(user?.id)

  return (
    <main className="p-4 md:p-8">
      <Meta
        title={t("Mes groupes, simulateur d'empreinte carbone")}
        description={t(
          "Calculez votre empreinte carbone en groupe et comparez la avec l'empreinte de vos proches grâce au simulateur de bilan carbone personnel Nos Gestes Climat."
        )}
      />

      <AutoCanonicalTag />

      <Title
        title={t("Groupe d'amis")}
        subtitle={t(
          'Comparez vos résultats avec votre famille ou un groupe d’amis'
        )}
      />

      <FeedbackBlock />

      {isFetched && !groups && <ServerErrorSection />}

      {!currentSimulation && <NoSimulationSection />}

      {currentSimulation && groups && groups?.length === 0 && (
        <CreateFirstGroupSection />
      )}

      {currentSimulation && groups && groups?.length > 0 && (
        <CreateOtherGroupsSection groups={groups} />
      )}

      <SondagesBlock />
    </main>
  )
}
