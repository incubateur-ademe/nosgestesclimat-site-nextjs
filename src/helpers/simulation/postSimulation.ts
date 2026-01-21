import { SIMULATION_URL } from '@/constants/urls/main'
import type { Locale } from '@/i18nConfig'
import type { Simulation } from '@/publicodes-state/types'
import { captureException } from '@sentry/nextjs'
import { mapNewSimulationToOld } from './mapNewSimulation'

interface Props {
  simulation: Simulation
  sendEmail?: boolean
  userId: string
  locale: Locale
}

export async function postSimulation({
  simulation,
  userId,
  sendEmail = false,
  locale,
}: Props) {
  const url = new URL(`${SIMULATION_URL}/${userId}`)

  url.searchParams.set('sendEmail', sendEmail.toString())
  url.searchParams.set('locale', locale)

  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(simulation),
    credentials: 'include',
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
