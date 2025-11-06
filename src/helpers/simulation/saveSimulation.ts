import { SIMULATION_URL } from '@/constants/urls/main'
import { getModelVersion } from '@/helpers/modelFetching/getModelVersion'
import {
  mapNewSimulationToOld,
  mapOldSimulationToNew,
} from '@/helpers/simulation/mapNewSimulation'
import type { Simulation, User } from '@/publicodes-state/types'
import { captureException } from '@sentry/nextjs'

type SaveSimulationParams = {
  simulation: Simulation
  userId: string
  email?: string
  name?: string
  code?: string
  sendEmail?: true
}

export async function saveSimulation({
  simulation,
  userId,
  email,
  name,
  code,
  sendEmail,
}: SaveSimulationParams): Promise<Simulation | undefined> {
  const modelVersion = await getModelVersion()

  // Strip unrecognized keys before mapping and posting
  const sanitized: Simulation & {
    createdAt?: string
    updatedAt?: string
    user?: User
  } = { ...simulation }

  delete sanitized.createdAt
  delete sanitized.updatedAt
  delete sanitized.user

  const payload = {
    ...mapOldSimulationToNew(sanitized),
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
  if (email) {
    url.searchParams.set('email', email)
  }
  if (code) {
    url.searchParams.set('code', code)
  }

  try {
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      credentials: email && code ? 'include' : 'omit',
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
