import { SIMULATION_URL } from '@/constants/urls/main'
import type { Simulation as ClientSimulation } from '@/publicodes-state/types'
import type { Simulation as ServerSimulation } from '@/types/organisations'
import { captureException } from '@sentry/nextjs'
import { getInitialExtendedSituation } from '../modelFetching/getInitialExtendedSituation'
import { mapNewSimulationToOld } from '../simulation/mapNewSimulation'

export async function fetchUserSimulations({
  userId,
}: {
  userId: string
}): Promise<ClientSimulation[]> {
  const response = await fetch(`${SIMULATION_URL}/${userId}?pageSize=50`, {
    credentials: 'include',
  })

  if (!response.ok) {
    captureException(new Error('Failed to fetch user simulations'))
    return []
  }

  const serverSimulations = (await response.json()) as ServerSimulation[]
  // Map from server format to client format
  const simulations = serverSimulations.map((simulation) => {
    const mappedSimulation = mapNewSimulationToOld(simulation)

    // Ensure extendedSituation is always defined (for old simulations that might not have it)
    if (!mappedSimulation.extendedSituation) {
      mappedSimulation.extendedSituation = getInitialExtendedSituation()
    }

    return mappedSimulation
  })

  const sortedSimulations = simulations.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  return sortedSimulations
}
