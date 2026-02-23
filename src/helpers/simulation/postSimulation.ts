import { SIMULATION_URL } from '@/constants/urls/main'
import type { Locale } from '@/i18nConfig'
import type { Simulation } from '@/publicodes-state/types'
import type { Simulation as NewSimulation } from '@/types/organisations'
import { captureException } from '@sentry/nextjs'
import { mapNewSimulationToOld } from './mapNewSimulation'

type Props = {
  simulation: Simulation
  sendEmail?: boolean
  userId: string
  locale: Locale
} & ({ code: string; email: string } | { code?: never; email?: never })

export async function postSimulation({
  simulation,
  userId,
  sendEmail = false,
  email,
  locale,
  code,
}: Props) {
  const url = new URL(`${SIMULATION_URL}/${userId}`)

  url.searchParams.set('sendEmail', sendEmail.toString())
  url.searchParams.set('locale', locale)

  if (code && email) {
    url.searchParams.set('code', code)
    url.searchParams.set('email', email)
  }

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

  let simulationSaved: NewSimulation

  try {
    simulationSaved = (await response.json()) as NewSimulation
  } catch (error) {
    captureException(error)
    throw error
  }

  return mapNewSimulationToOld(simulationSaved)
}
