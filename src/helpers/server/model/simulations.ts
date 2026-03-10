'use server'

import { SIMULATION_URL } from '@/constants/urls/main'
import type {
  ComputedResults,
  Simulation,
  Situation,
} from '@/publicodes-state/types'
import { captureException } from '@sentry/nextjs'
import { cacheLife, cacheTag } from 'next/cache'
import { fetchServer } from './fetchServer'
import { fetchGroupById } from './groups'
import { fetchPublicPollBySlug } from './organisations'
import { getTendency, type Tendency } from './utils/getTendency'
import { setDefaultExtendedSituation } from './utils/setDefaultExtendedSituation'

export interface SimulationResult {
  computedResults: ComputedResults
  tendency?: Tendency
  situation: Situation
  progression: number
  date: string | Date
  group: { name: string; href: string } | null
}

export async function getUserSimulations({
  userId,
}: {
  userId: string
}): Promise<Simulation[]> {
  const serverSimulations = await fetchServer<Simulation[]>(
    `${SIMULATION_URL}/${userId}?pageSize=50`
  )

  if (serverSimulations.length === 0) {
    return []
  }

  // Map from server format to client format
  const simulations = serverSimulations.map((simulation) => {
    const updatedSimulation = setDefaultExtendedSituation(simulation)

    return updatedSimulation
  })

  const sortedSimulations = simulations.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  return sortedSimulations
}

export async function getSimulation({
  userId,
  simulationId,
  auth = true,
}: {
  userId: string
  simulationId: string
  auth?: boolean
}): Promise<Simulation | undefined> {
  try {
    const simulation = await fetchServer<Simulation>(
      `${SIMULATION_URL}/${userId}/${simulationId}`,
      {
        auth,
      }
    )

    const updatedSimulation = setDefaultExtendedSituation(simulation)

    return updatedSimulation
  } catch (error) {
    captureException(error)
    return undefined
  }
}

export async function getSimulationResult({
  userId,
  simulationId,
}: {
  userId: string
  simulationId: string
}): Promise<SimulationResult | null> {
  'use cache'
  cacheLife('weeks')
  cacheTag(`simulation-${simulationId}`)

  const simulation = await getSimulation({
    userId,
    simulationId,
    auth: false,
  })

  if (!simulation) {
    return null
  }

  let group: { name: string; href: string } | null = null

  if (simulation.groups?.length) {
    const groupId = simulation.groups[0]

    const groupData = await fetchGroupById({
      groupId,
      userId,
    })

    if (groupData) {
      group = {
        name: groupData.name,
        href: `/amis/resultats?groupId=${groupData.id}`,
      }
    }
  }

  // If no group found, try to find an associated poll/campaign
  if (!group && simulation.polls?.length) {
    const pollSlug = simulation.polls[0]
    const pollDetails = await fetchPublicPollBySlug({
      userId,
      pollSlug,
    })

    if (pollDetails) {
      group = {
        name: pollDetails.name,
        href: `/organisations/${pollDetails.organisation.slug}/campagnes/${pollSlug}`,
      }
    }
  }

  const allUserSimulations = await getUserSimulations({ userId })

  let previousComputedResults
  if (allUserSimulations.length > 1) {
    previousComputedResults = allUserSimulations.find(
      (sim) =>
        new Date(sim.date).getTime() < new Date(simulation.date).getTime() &&
        sim.progression === 1
    )?.computedResults
  }

  return {
    computedResults: simulation.computedResults,
    tendency: getTendency({
      previousValue: previousComputedResults?.carbone.bilan,
      currentValue: simulation.computedResults.carbone.bilan,
    }),
    situation: simulation.situation,
    progression: simulation.progression,
    date: simulation.date,
    group,
  }
}
