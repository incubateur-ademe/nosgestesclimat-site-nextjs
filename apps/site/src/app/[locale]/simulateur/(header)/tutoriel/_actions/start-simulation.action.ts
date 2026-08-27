'use server'

import { getLinkToSimulateur } from '@/helpers/navigation/simulateurPages'
import { getLocaleFromHeaders } from '@/helpers/server/getLocaleForNotFoundOrUnautorizedPage'
import { createSimulation } from '@/services/simulations/create-simulation'
import { resolveNewSimulationModel } from '@/services/simulations/resolve-new-simulation-model'
import type { SearchParams } from 'next/dist/server/request/search-params'
import { redirect } from 'next/navigation'

/**
 * Creates the session + simulation when a visitor starts their very first
 * simulation from the tutorial.
 *
 * A Server Action is the only server context where `cookies().set()` (used by
 * `createAppSession` to create the anonymous session) is allowed — a page
 * (Server Component) cannot write cookies during rendering.
 *
 * `searchParams` are forwarded to `resolveNewSimulationModel` so the model
 * (region, PR, mode) matches the query params the visitor arrived with.
 */
export async function startSimulation(searchParams?: SearchParams) {
  const model = await resolveNewSimulationModel({
    searchParams: Promise.resolve(searchParams ?? {}),
  })

  await createSimulation(model)

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
