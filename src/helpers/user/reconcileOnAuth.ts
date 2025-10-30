import { mergeSimulations } from '@/helpers/simulation/mergeSimulations'
import type { Simulation, User } from '@/publicodes-state/types'
import { safeLocalStorage } from '@/utils/browser/safeLocalStorage'

type Params = {
  storageKey: string
  serverUserId: string
  serverSimulations: Simulation[]
  syncToServer?: boolean
}

type Result = {
  mergedUser: User
  mergedSimulations: Simulation[]
  currentSimulationId: string
  simulationsToSync: Simulation[]
}

export function reconcileOnAuth({
  storageKey,
  serverUserId,
  serverSimulations,
  syncToServer,
}: Params): Result {
  // Read local storage
  let parsed: any = {}
  try {
    parsed = JSON.parse(safeLocalStorage.getItem(storageKey) || '{}')
  } catch {
    parsed = {}
  }

  const localUser: User | undefined = parsed.user
  const localSimulations: Simulation[] = parsed.simulations || []
  const localCurrentSimulationId: string | undefined =
    parsed.currentSimulationId

  // Build merged user: override userId with server
  const mergedUser: User = {
    ...localUser,
    userId: serverUserId,
  } as User

  // Merge simulations
  const { mergedSimulations, currentSimulationId, simulationsToSync } =
    mergeSimulations(serverSimulations, localSimulations, {
      localCurrentSimulationId,
    })

  // Persist locally
  const updated = {
    ...parsed,
    user: mergedUser,
    simulations: mergedSimulations,
    currentSimulationId,
  }
  safeLocalStorage.setItem(storageKey, JSON.stringify(updated))

  return {
    mergedUser,
    mergedSimulations,
    currentSimulationId,
    simulationsToSync: syncToServer ? simulationsToSync : [],
  }
}
