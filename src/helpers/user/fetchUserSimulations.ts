import { SIMULATION_URL } from '@/constants/urls/main'
import type { Simulation } from '@/publicodes-state/types'

export async function fetchUserSimulations({
  userId,
}: {
  userId: string
}): Promise<Simulation[]> {
  const response = await fetch(`${SIMULATION_URL}/${userId}`)
  const data = await response.json()

  if (!response.ok) {
    throw new Error('Failed to fetch user simulations')
  }

  return data
}
