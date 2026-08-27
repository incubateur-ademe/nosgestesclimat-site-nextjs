import CurrentSimulationTracker from '@/components/tracking/CurrentSimulationTracker'
import { SIMULATOR_PATH } from '@/constants/urls/paths'
import { getLinkToSimulateur } from '@/helpers/navigation/simulateurPages'

import { getCompletedSimulations } from '@/services/simulations/get-completed-simulations'
import { getCurrentSimulation } from '@/services/simulations/get-current-simulation'
import type { SearchParams } from 'next/dist/server/request/search-params'
import { redirect } from 'next/navigation'
import Tutorial from '../_components/Tutorial'
import ButtonNext from './_components/ButtonNext'

export default async function TutorielPage({
  params,
  searchParams,
}: PageProps<'/[locale]/simulateur/tutoriel'>) {
  const { locale } = await params
  const resolvedSearchParams = (await searchParams) as SearchParams | undefined

  const [currentSimulation, completedSimulations] = await Promise.all([
    getCurrentSimulation(),
    getCompletedSimulations({ pageSize: 1 }),
  ])

  if (
    (currentSimulation && currentSimulation.progression > 0) ||
    completedSimulations.length
  ) {
    redirect(SIMULATOR_PATH)
  }

  const urlSearchParams = new URLSearchParams()
  for (const [key, value] of Object.entries(resolvedSearchParams ?? {})) {
    if (typeof value === 'string') {
      urlSearchParams.set(key, value)
    }
  }

  return (
    <>
      {currentSimulation && (
        <CurrentSimulationTracker currentSimulation={currentSimulation} />
      )}

      <Tutorial
        locale={locale}
        buttonNext={
          <ButtonNext
            locale={locale}
            // No simulation yet → `/simulateur/commencer` (which creates it
            // and redirects to the simulator). A simulation already exists
            // (progression 0) → go straight to the simulator.
            href={
              currentSimulation
                ? getLinkToSimulateur({ locale, searchParams: urlSearchParams })
                : `/simulateur/commencer${urlSearchParams.size > 0 ? `?${urlSearchParams.toString()}` : ''}`
            }
          />
        }
      />
    </>
  )
}
