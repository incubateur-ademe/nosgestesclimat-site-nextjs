'use client'

import { GROUP_URL } from '@/constants/urls'

import { Group } from '@/types/groups'
import { captureException } from '@sentry/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Title from '@/design-system/layout/Title'
import { useUser } from '@/publicodes-state'
import CreateFirstGroupSection from './_components/CreateFirstGroupSection'
import CreateOtherGroupsSection from './_components/CreateOtherGroupsSection'
import NoSimulationSection from './_components/NoSimulationSection'
import { ServerErrorSection } from './_components/ServerErrorSection'
import FeedbackBlock from './resultats/components/FeedbackBlock'
import SondagesBlock from './resultats/components/SondagesBlock'

export default function MesGroupes() {
  const [groups, setGroups] = useState<Group[] | null>(null)
  const [isFetched, setIsFetched] = useState(false)

  const { t } = useTranslation()

  const { getCurrentSimulation, user } = useUser()

  const currentSimulation = getCurrentSimulation()

  useEffect(() => {
    const handleFetchGroups = async () => {
      setIsFetched(true)
      try {
        const response = await fetch(`${GROUP_URL}/user-groups/${user?.id}`)
        if (!response.ok) {
          throw new Error('Error while fetching groups')
        }

        const groupsFetched: Group[] = await response.json()

        setGroups(groupsFetched)
      } catch (error) {
        captureException(error)
      }
    }

    if (user?.id && !groups) {
      handleFetchGroups()
    }
  }, [groups, user?.id])

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

      {currentSimulation && groups && groups.length === 0 && (
        <CreateFirstGroupSection />
      )}

      {currentSimulation && groups && groups.length > 0 && (
        <CreateOtherGroupsSection groups={groups} />
      )}

      <SondagesBlock />
    </main>
  )
}
