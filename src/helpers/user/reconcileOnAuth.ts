import { STORAGE_KEY } from '@/constants/storage'
import { saveSimulation } from '@/helpers/simulation/saveSimulation'
import { fetchUserSimulations } from '@/helpers/user/fetchUserSimulations'
import type { LocalStorage, Simulation, User } from '@/publicodes-state/types'
import { safeLocalStorage } from '@/utils/browser/safeLocalStorage'

type Params = {
  serverUserId: string
}

type Result = {
  mergedUser: User
  mergedSimulations: Simulation[]
  currentSimulationId: string
  simulationsToSync: Simulation[]
}

export async function reconcileOnAuth({
  serverUserId,
}: Params): Promise<Result> {
  // Read local storage
  let parsed: LocalStorage | undefined = undefined
  try {
    parsed = JSON.parse(safeLocalStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    parsed = undefined
  }

  const localUser: User | undefined = parsed?.user
  const localSimulations: Simulation[] = parsed?.simulations || []
  const localCurrentSimulationId: string | undefined =
    parsed?.currentSimulationId

  // Fetch simulations from server
  const serverSimulations = await fetchUserSimulations({
    userId: serverUserId,
  })

  // Build merged user: override userId with server
  const mergedUser: User = {
    ...localUser,
    userId: serverUserId,
  } as User

  // Create a Set of server simulation IDs for deduplication
  const serverSimulationIds = new Set(
    serverSimulations?.map((s) => s.id).filter(Boolean) ?? []
  )

  // Identify local-only simulations (not in server) with progression > 0
  const localOnlySimulations = localSimulations.filter(
    (simulation) =>
      simulation.id &&
      !serverSimulationIds.has(simulation.id) &&
      simulation.progression > 0
  )

  // Save local-only simulations to DB (using Promise.allSettled to handle errors gracefully)
  const savedSimulations: Simulation[] = []

  if (localOnlySimulations.length > 0) {
    const saveResults = await Promise.allSettled(
      localOnlySimulations.map((simulation) =>
        saveSimulation({
          simulation,
          userId: serverUserId,
          email: mergedUser.email,
          name: mergedUser.name,
        })
      )
    )

    // Collect successfully saved simulations
    saveResults?.forEach((result) => {
      if (result.status === 'fulfilled' && result.value) {
        savedSimulations.push(result.value)
      }
      // Silently ignore failed saves (best-effort)
    })
  }

  // Merge server simulations + saved local simulations + remaining local simulations
  // Use Set to deduplicate by ID
  const allSimulations = new Map<string, Simulation>()

  ;[
    ...(serverSimulations ?? []),
    ...savedSimulations,
    ...localSimulations,
  ].forEach((simulation: Simulation) => {
    allSimulations.set(simulation.id, simulation)
  })

  // Convert to array and sort by date desc
  const mergedSimulations = Array.from(allSimulations.values()).sort((a, b) => {
    const dateA = a.date ? new Date(a.date).getTime() : 0
    const dateB = b.date ? new Date(b.date).getTime() : 0
    return dateB - dateA
  })

  // Determine currentSimulationId
  let currentSimulationId = ''
  if (
    localCurrentSimulationId &&
    mergedSimulations.some((s) => s.id === localCurrentSimulationId)
  ) {
    currentSimulationId = localCurrentSimulationId
  } else if (mergedSimulations[0]?.id) {
    currentSimulationId = mergedSimulations[0].id
  }

  // Persist locally
  const updated = {
    ...parsed,
    user: mergedUser,
    simulations: mergedSimulations,
    currentSimulationId,
  }
  safeLocalStorage.setItem(STORAGE_KEY, JSON.stringify(updated))

  return {
    mergedUser,
    mergedSimulations,
    currentSimulationId,
    simulationsToSync: [], // Already saved, no need to sync
  }
}
