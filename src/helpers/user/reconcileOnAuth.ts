import { STORAGE_KEY } from '@/constants/storage'
import { saveSimulation } from '@/helpers/simulation/saveSimulation'
import { fetchUserSimulations } from '@/helpers/user/fetchUserSimulations'
import type { LocalStorage, Simulation } from '@/publicodes-state/types'
import { safeLocalStorage } from '@/utils/browser/safeLocalStorage'

interface Params {
  serverUserId: string
  updateSimulations: (newSimulations: Simulation[]) => void
  setCurrentSimulationId: (id: string) => void
}

// This is the date when we started to save all simulations started on the server
const LIMIT_DATE = new Date('2025-11-27')

export async function reconcileOnAuth({
  serverUserId,
  updateSimulations,
  setCurrentSimulationId,
}: Params) {
  // Read local storage
  let parsedLocalStorage: LocalStorage | undefined = undefined
  try {
    parsedLocalStorage = JSON.parse(
      safeLocalStorage.getItem(STORAGE_KEY) ?? '{}'
    ) as LocalStorage
  } catch {
    parsedLocalStorage = undefined
  }

  const localSimulations: Simulation[] = parsedLocalStorage?.simulations ?? []
  const localCurrentSimulationId: string | undefined =
    parsedLocalStorage?.currentSimulationId

  // Save all simulation started before the LIMIT_DATE
  const simulationsToSave = localSimulations.filter(
    (simulation) => new Date(simulation.date) < LIMIT_DATE
  )

  await Promise.allSettled(
    simulationsToSave.map((simulation) =>
      saveSimulation({
        simulation,
        userId: serverUserId,
        email: parsedLocalStorage?.user?.email,
        name: parsedLocalStorage?.user?.name,
      })
    )
  )

  // Fetch simulations from server
  const serverSimulations = await fetchUserSimulations({
    userId: serverUserId,
  })

  if (!serverSimulations) {
    return
  }

  // Determine currentSimulationId
  let currentSimulationId = ''
  if (
    localCurrentSimulationId &&
    serverSimulations.some((s) => s.id === localCurrentSimulationId)
  ) {
    currentSimulationId = localCurrentSimulationId
  } else if (serverSimulations?.[0]?.id) {
    currentSimulationId = serverSimulations[0].id
  }

  updateSimulations(serverSimulations)
  setCurrentSimulationId(currentSimulationId)
}
