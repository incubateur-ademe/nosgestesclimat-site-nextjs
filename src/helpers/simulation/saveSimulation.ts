import { SIMULATION_URL } from '@/constants/urls/main'
import { getModelVersion } from '@/helpers/modelFetching/getModelVersion'
import {
  mapNewSimulationToOld,
  mapOldSimulationToNew,
} from '@/helpers/simulation/mapNewSimulation'
import type { Simulation } from '@/publicodes-state/types'
import { captureException } from '@sentry/nextjs'
import { sanitizeSimulation } from './sanitizeSimulation'

interface SaveSimulationParams {
  simulation: Simulation
  userId: string
  email?: string
  name?: string
  sendEmail?: true
}

export async function saveSimulation({
  simulation,
  userId,
  email,
  name,
  sendEmail,
}: SaveSimulationParams): Promise<Simulation | undefined> {
  const modelVersion = await getModelVersion()

  // Strip unrecognized keys before mapping and posting
  const sanitizedSimulation = sanitizeSimulation(simulation)

  const payload = {
    ...mapOldSimulationToNew(sanitizedSimulation),
    model: modelVersion,
    ...(name || email
      ? {
          user: {
            ...(email ? { email } : {}),
            ...(name ? { name } : {}),
          },
        }
      : {}),
  }

  // Build URL with query params
  const url = new URL(`${SIMULATION_URL}/${userId}`)

  if (sendEmail) {
    url.searchParams.set('sendEmail', 'true')
  }

  try {
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error('Failed to save simulation')
    }

    const data = await response.json()
    return mapNewSimulationToOld(data)
  } catch (error) {
    captureException(error)
    return undefined
  }
}
