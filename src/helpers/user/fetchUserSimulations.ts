import { SIMULATION_URL } from '@/constants/urls/main'
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
    return Array.isArray(data)
      ? data.map((simulation: any) => mapNewSimulationToOld(simulation))
      : []
  } catch (error) {
    captureException(error)
    return undefined
  }
}
