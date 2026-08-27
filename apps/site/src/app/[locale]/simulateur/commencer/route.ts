import { getLinkToSimulateur } from '@/helpers/navigation/simulateurPages'
import { getLocaleFromHeaders } from '@/helpers/server/getLocaleForNotFoundOrUnautorizedPage'
import { stringifyModel } from '@/helpers/server/model/models'
import { createSimulation } from '@/services/simulations/create-simulation'
import { getCurrentSimulation } from '@/services/simulations/get-current-simulation'
import { resolveNewSimulationModel } from '@/services/simulations/resolve-new-simulation-model'
import type { SearchParams } from 'next/dist/server/request/search-params'
import { NextResponse } from 'next/server'

/**
 * The single entry point that creates a simulation.
 *
 * A Route Handler is the only server context (besides Server Actions) where
 * `cookies().set()` — used by `createAppSession` — is allowed, so the session
 * + simulation can be created here without any client-side code. The query
 * params (`?region=`, `?PR=`, `?mode=`) are forwarded to the model resolution
 * and preserved in the redirect to the simulator.
 */
export async function GET(request: Request) {
  const searchParams = Object.fromEntries(
    new URL(request.url).searchParams
  ) as SearchParams

  const current = await getCurrentSimulation()
  const model = await resolveNewSimulationModel({
    searchParams: Promise.resolve(searchParams),
  })

  if (
    !current ||
    current.progression > 0 ||
    current.model !== stringifyModel(model)
  ) {
    await createSimulation(model)
  }

  const urlSearchParams = new URLSearchParams()
  for (const [key, value] of Object.entries(searchParams)) {
    if (typeof value === 'string') {
      urlSearchParams.set(key, value)
    }
  }

  return NextResponse.redirect(
    new URL(
      getLinkToSimulateur({
        locale: await getLocaleFromHeaders(),
        searchParams: urlSearchParams,
      }),
      request.url
    ),
    302
  )
}
