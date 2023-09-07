'use client'

import Title from '@/design-system/layout/Title'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import CreateFirstGroupSection from './_components/CreateFirstGroupSection'
import CreateOtherGroupsSection from './_components/CreateOtherGroupsSection'
import NoSimulationSection from './_components/NoSimulationSection'
import { ServerErrorSection } from './_components/ServerErrorSection'
import { useGetGroups } from './_hooks/useGetGroups'
import FeedbackBlock from './resultats/components/FeedbackBlock'
import SondagesBlock from './resultats/components/SondagesBlock'

export default function GroupesPage() {
  const { t } = useClientTranslation()

  const { getCurrentSimulation, user } = useUser()

  const currentSimulation = getCurrentSimulation()

  const { data: groups, isFetched } = useGetGroups(user?.id)

  return (
    <main className="p-4 md:p-8">
      {/*
			TODO: uncomment
      <Meta
        title={t("Mes groupes, simulateur d'empreinte carbone")}
        description={t(
          "Calculez votre empreinte carbone en groupe et comparez la avec l'empreinte de vos proches grâce au simulateur de bilan carbone personnel Nos Gestes Climat."
        )}
      />

      <AutoCanonicalTag />
				*/}

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
