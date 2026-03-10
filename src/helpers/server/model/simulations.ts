'use server'

import { SIMULATION_URL } from '@/constants/urls/main'
import type { Simulation } from '@/publicodes-state/types'
import { fetchServer } from './fetchServer'
import { setDefaultExtendedSituation } from './utils/setDefaultExtendedSituation'

export async function getUserSimulations({
  userId,
}: {
  userId: string
}): Promise<Simulation[]> {
  const serverSimulations = await fetchServer<Simulation[]>(
    `${SIMULATION_URL}/${userId}?pageSize=50`
  )

  // Map from server format to client format
  const simulations = serverSimulations.map((simulation) => {
    const updatedSimulation = setDefaultExtendedSituation(simulation)

    return updatedSimulation
  })

  const sortedSimulations = simulations.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  return sortedSimulations
}

export async function getSimulation({
  userId,
  simulationId,
  auth = true,
}: {
  userId: string
  simulationId: string
  auth?: boolean
}): Promise<Simulation | undefined> {
  const simulation = await fetchServer<Simulation>(
    `${SIMULATION_URL}/${userId}/${simulationId}`,
    {
      auth,
    }
  )

  const updatedSimulation = setDefaultExtendedSituation(simulation)

  return updatedSimulation
}
