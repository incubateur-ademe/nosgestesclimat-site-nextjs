import { SIMULATION_URL } from '@/constants/urls/main'
import { getInitialExtendedSituation } from '@/helpers/modelFetching/getInitialExtendedSituation'
import { mapNewSimulationToOld } from '@/helpers/simulation/mapNewSimulation'
import type { Simulation } from '@/publicodes-state/types'
import { captureException } from '@sentry/nextjs'

export async function fetchUserSimulations({
  userId,
}: {
  userId?: string
}): Promise<Simulation[] | undefined> {
  if (!userId) {
    return []
  }

  try {
    const response = await fetch(`${SIMULATION_URL}/${userId}`)
    const data = await response.json()

    if (!response.ok) {
      throw new Error('Failed to fetch user simulations')
    }

    // Map from new format to old format
    const simulations = Array.isArray(data)
      ? data.map((simulation: any) => {
          const mappedSimulation = mapNewSimulationToOld(simulation)

          // Ensure extendedSituation is always defined (for old simulations that might not have it)
          if (!mappedSimulation.extendedSituation) {
            mappedSimulation.extendedSituation = getInitialExtendedSituation()
          }

          return mappedSimulation
        })
      : []

    const sortedSimulations = simulations?.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    return sortedSimulations
  } catch (error) {
    captureException(error)
    return undefined
  }
}
