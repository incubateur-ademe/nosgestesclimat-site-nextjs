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
 * Single entry point to (re)start a simulation — merges the former
 * `/simulateur/commencer` into `/simulateur/tutoriel`.
 *
 * - First visit (no session yet): show the tutorial. The "C'est parti !"
 *   button (`ButtonNext`) is a form action that creates the session +
 *   simulation (writing cookies is only allowed from a Server Action) and
 *   redirects to the simulator.
 * - Group join flow (in-progress group-bound simulation): show the tutorial
 *   too — its button reuses the group simulation instead of creating a fresh
 *   one, so the participant stays linked to the group.
 * - Otherwise (existing session): this is a "restart", so a fresh simulation
 *   is always created — including when the previous one is completed,
 *   otherwise the simulator layout would send the user back to the results
 *   page instead of restarting. Creating the simulation is safe in a Server
 *   Component because `createAppSession` is only called when there is no
 *   session — here the session already exists, so no cookie is written.
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

  // Group join flow: the participant just joined, their group-bound simulation
  // is brand new (progression 0). Show the tutorial so they can start it.
  if (currentSimulation?.groups?.length && currentSimulation.progression < 1) {
    return <Tutorial locale={locale} buttonNext={<ButtonNext />} />
  }

  const model = await resolveNewSimulationModel({
    searchParams: Promise.resolve(resolvedSearchParams ?? {}),
    locale: locale as Locale,
  })

  await createSimulation(model)

  redirect(SIMULATOR_PATH)
}
