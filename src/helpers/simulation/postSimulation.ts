import { SIMULATION_URL } from '@/constants/urls/main'
import type { Simulation } from '@/publicodes-state/types'
import { captureException } from '@sentry/nextjs'
import { mapNewSimulationToOld } from './mapNewSimulation'

interface Props {
  simulation: Simulation
  sendEmail?: boolean
  userId: string
}

export async function postSimulation({
  simulation,
  userId,
  sendEmail = false,
}: Props) {
  const url = new URL(`${SIMULATION_URL}/${userId}`)

  url.searchParams.set('sendEmail', sendEmail.toString())

  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(simulation),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  let simulationSaved

  try {
    simulationSaved = await response.json()
  } catch (error) {
    captureException(error)
    throw error
  }

  return mapNewSimulationToOld(simulationSaved)
}
