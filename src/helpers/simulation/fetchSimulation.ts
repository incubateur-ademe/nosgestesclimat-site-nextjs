import { SIMULATION_URL } from '@/constants/urls/main'
import { mapNewSimulationToOld } from './mapNewSimulation'

export async function fetchSimulation({
  userId,
  simulationId,
}: {
  userId: string
  simulationId: string
}) {
  const response = await fetch(`${SIMULATION_URL}/${userId}/${simulationId}`)

  if (!response.ok) {
    throw new Error('Failed to fetch simulation')
  }

  return mapNewSimulationToOld((await response.json()) ?? {})
}
