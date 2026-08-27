'use server'

import { getLinkToSimulateur } from '@/helpers/navigation/simulateurPages'
import { getLocaleFromHeaders } from '@/helpers/server/getLocaleForNotFoundOrUnautorizedPage'
import { createSimulation } from '@/services/simulations/create-simulation'
import { getCurrentSimulation } from '@/services/simulations/get-current-simulation'
import { resolveNewSimulationModel } from '@/services/simulations/resolve-new-simulation-model'
import type { SearchParams } from 'next/dist/server/request/search-params'
import { redirect } from 'next/navigation'

/**
 * Starts the simulation from the tutorial.
 *
 * A Server Action is the only server context where `cookies().set()` (used by
 * `createAppSession` to create the anonymous session) is allowed — a page
 * (Server Component) cannot write cookies during rendering.
 *
 * When the visitor already has an in-progress simulation bound to a group (the
 * group join flow lands on the tutorial after creating it), that simulation is
 * reused instead of creating a fresh one, so the participant stays linked to
 * the group. Otherwise a brand new simulation is created.
 *
 * `searchParams` are forwarded to `resolveNewSimulationModel` so the model
 * (region, PR, mode) matches the query params the visitor arrived with.
 */
export async function startSimulation(searchParams?: SearchParams) {
  const current = await getCurrentSimulation()

  // Group join flow: reuse the in-progress group-bound simulation.
  if (!current?.groups?.length || current.progression === 1) {
    const model = await resolveNewSimulationModel({
      searchParams: Promise.resolve(searchParams ?? {}),
    })

    await createSimulation(model)
  }

  const urlSearchParams = new URLSearchParams()
  for (const [key, value] of Object.entries(searchParams ?? {})) {
    if (typeof value === 'string') {
      urlSearchParams.set(key, value)
    }
  }

  redirect(
    getLinkToSimulateur({
      locale: await getLocaleFromHeaders(),
      searchParams: urlSearchParams,
    })
  )
}
