import CurrentSimulationTracker from '@/components/tracking/CurrentSimulationTracker'
import { SIMULATOR_PATH } from '@/constants/urls/paths'
import type { Locale } from '@/i18nConfig'
import { getUserSession } from '@/services/auth/get-user-session'
import { createSimulation } from '@/services/simulations/create-simulation'
import { getCurrentSimulation } from '@/services/simulations/get-current-simulation'
import { resolveNewSimulationModel } from '@/services/simulations/resolve-new-simulation-model'
import type { SearchParams } from 'next/dist/server/request/search-params'
import { redirect } from 'next/navigation'
import Tutorial from '../_components/Tutorial'
import ButtonNext from './_components/ButtonNext'

/**
 * Single entry point to (re)start a simulation
 *
 * - First visit (no session yet): show the tutorial. form action that creates the session + simulation and redirects to the simulator.
 * - Group join flow : reuses the group simulation instead of creating a fresh
 *   one, so the participant stays linked to the group.
 * - In-progress simulation (not group-bound): resume it straight from the
 *   simulator.
 * - Otherwise (existing session, completed or no simulation): this is a
 *   "restart", so a fresh simulation is always created.
 */
export default async function TutorielPage({
  params,
  searchParams,
}: PageProps<'/[locale]/simulateur/tutoriel'>) {
  const { locale } = await params
  const resolvedSearchParams = (await searchParams) as SearchParams | undefined

  const session = await getUserSession()

  if (!session) {
    return <Tutorial locale={locale} buttonNext={<ButtonNext />} />
  }

  const currentSimulation = await getCurrentSimulation()

  if (currentSimulation && currentSimulation.progression > 0) {
    const model = await resolveNewSimulationModel({
      searchParams: Promise.resolve(resolvedSearchParams ?? {}),
      locale: locale as Locale,
    })

    await createSimulation(model)

    redirect(SIMULATOR_PATH)
  }

  return (
    <>
      {currentSimulation && (
        <CurrentSimulationTracker currentSimulation={currentSimulation} />
      )}

      <Tutorial locale={locale} buttonNext={<ButtonNext />} />
    </>
  )
}
