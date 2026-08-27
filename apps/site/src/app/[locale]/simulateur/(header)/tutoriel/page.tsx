import { SIMULATOR_PATH } from '@/constants/urls/paths'
import { stringifyModel } from '@/helpers/server/model/models'
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
 * `/simulateur/commencer` and `/simulateur/tutoriel`.
 *
 * - First visit (no session yet): show the tutorial. The "C'est parti !"
 *   button (`ButtonNext`) is a form action that creates the session +
 *   simulation (writing cookies is only allowed from a Server Action) and
 *   redirects to the simulator.
 * - Existing session: a simulation already exists (or has existed), so this is
 *   a "restart". Creating the simulation is safe in a Server Component because
 *   `createAppSession` is only called when there is no session — here the
 *   session already exists, so no cookie is written. Redirect straight to the
 *   simulator.
 * - Simulation linked to a group: keep it and go to the simulator (the group
 *   join flow lands here after creating the group-bound simulation).
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

  // Group join flow: the current simulation is bound to a group and must not
  // be replaced by a fresh one.
  if (currentSimulation?.groups?.length) {
    redirect(SIMULATOR_PATH)
  }

  const model = await resolveNewSimulationModel({
    searchParams: Promise.resolve(resolvedSearchParams ?? {}),
    locale: locale as Locale,
  })

  if (currentSimulation?.model !== stringifyModel(model)) {
    await createSimulation(model)
  }

  redirect(SIMULATOR_PATH)
}
