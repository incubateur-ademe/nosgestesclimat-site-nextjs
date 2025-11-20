import { SIMULATION_URL } from '@/constants/urls/main'
import type { Simulation } from '@/publicodes-state/types'
import { captureException } from '@sentry/nextjs'
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

    return mapNewSimulationToOld((await response.json()) ?? {})
  } catch (error) {
    captureException(error)
    return undefined
  }
}
