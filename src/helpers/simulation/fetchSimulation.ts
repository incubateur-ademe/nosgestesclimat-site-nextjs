import { SIMULATION_URL } from '@/constants/urls/main'
import type { Simulation } from '@/publicodes-state/types'
import { captureException } from '@sentry/nextjs'
import { getInitialExtendedSituation } from '../modelFetching/getInitialExtendedSituation'
import { mapNewSimulationToOld } from './mapNewSimulation'

export async function fetchSimulation({
  userId,
  simulationId,
}: {
  userId: string
  simulationId: string
}): Promise<Simulation | undefined> {
  try {
    const response = await fetch(`${SIMULATION_URL}/${userId}/${simulationId}`)

    if (!response.ok) {
      throw new Error('Failed to fetch simulation')
    }

    const mappedSimulation = mapNewSimulationToOld(await response.json())

    // Ensure extendedSituation is always defined (for old simulations that might not have it)
    if (!mappedSimulation.extendedSituation) {
      mappedSimulation.extendedSituation = getInitialExtendedSituation()
    }

    return mappedSimulation
  } catch (error) {
    captureException(error)
    return undefined
  }
}
