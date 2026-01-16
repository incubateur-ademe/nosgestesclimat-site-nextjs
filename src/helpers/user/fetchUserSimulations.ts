import { SIMULATION_URL } from '@/constants/urls/main'
import type { Simulation } from '@/publicodes-state/types'

export async function fetchUserSimulations({
  userId,
}: {
  userId: string
}): Promise<Simulation[]> {
  const response = await fetch(`${SIMULATION_URL}/${userId}?pageSize=50`)

  if (!response.ok) {
    throw new Error('Failed to fetch user simulations')
  }

  const simulations = (await response.json()) as Simulation[]

  const sortedSimulations = simulations.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  return sortedSimulations
}
