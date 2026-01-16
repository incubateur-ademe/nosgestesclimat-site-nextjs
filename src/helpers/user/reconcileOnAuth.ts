import { saveSimulation } from '@/helpers/simulation/saveSimulation'
import { fetchUserSimulations } from '@/helpers/user/fetchUserSimulations'
import type { Simulation } from '@/publicodes-state/types'

// This is the date when we started to save all simulations started on the server
const LIMIT_DATE = new Date('2025-11-27')

export async function syncLocalSimulation({
  simulations,
  userId,
}: {
  simulations: Simulation[]
  userId: string
}) {
  // Save all simulation started before the LIMIT_DATE
  const simulationsToSave = simulations.filter(
    (simulation) => new Date(simulation.date) < LIMIT_DATE
  )

  await Promise.allSettled(
    simulationsToSave.map((simulation) =>
      saveSimulation({
        simulation,
        userId,
      })
    )
  )
}

export async function loadServerSimulation({
  userId,
  updateSimulations,
  setCurrentSimulationId,
}: {
  userId: string
  updateSimulations: (simulations: Simulation[]) => void
  setCurrentSimulationId: (simulationId: string) => void
}) {
  // Fetch simulations from server
  const simulations = await fetchUserSimulations({
    userId,
  })

  updateSimulations(simulations)
  if (simulations.length) {
    setCurrentSimulationId(simulations[0].id)
  }
}
