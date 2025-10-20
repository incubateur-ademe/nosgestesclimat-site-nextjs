import { SIMULATION_URL } from '@/constants/urls/main'
import type { Simulation, User } from '@/publicodes-state/types'

type Props = {
  simulation: Simulation
  sendEmail?: boolean
  user: User
}

/**
 * This function is used to save simulations for tracking purposes only
 */
export async function saveSimulationForTracking({ simulation, user }: Props) {
  const payload = {
    progression: simulation.progression,
    situation: {},
    computedResults: simulation.computedResults,
    id: simulation.id,
  }

  const url = new URL(`${SIMULATION_URL}/${user.userId}`)

  url.searchParams.set('sendEmail', 'false')

  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
}
