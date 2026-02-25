'use server'

import { SIMULATION_URL } from '@/constants/urls/main'
import { getInitialExtendedSituation } from '@/helpers/modelFetching/getInitialExtendedSituation'
import type { ComputedResults, Simulation } from '@/publicodes-state/types'
import { captureException } from '@sentry/nextjs'
import { fetchServer } from './fetchServer'
import { fetchGroupById } from './groups'
import { fetchPublicPollBySlug } from './organisations'

export const setDefaultExtendedSituation = (
  simulation: Simulation
): Simulation => {
  const updatedSimulation = { ...simulation }

  // Ensure extendedSituation is always defined (for old simulations that might not have it)
  if (!updatedSimulation.extendedSituation) {
    updatedSimulation.extendedSituation = getInitialExtendedSituation()
  }

  return updatedSimulation
}

export async function getUserSimulations({
  userId,
}: {
  userId: string
}): Promise<Simulation[] | null> {
  const serverSimulations = await fetchServer<Simulation[]>(
    `${SIMULATION_URL}/${userId}?pageSize=50`
  )

  if (!serverSimulations || serverSimulations.length === 0) {
    return null
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
}: {
  userId: string
  simulationId: string
}): Promise<Simulation | undefined> {
  try {
    const response = await fetch(`${SIMULATION_URL}/${userId}/${simulationId}`)

    if (!response.ok) {
      throw new Error('Failed to fetch simulation')
    }

    const simulationParsed = await response.json()

    const updatedSimulation = setDefaultExtendedSituation(simulationParsed)

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
}): Promise<{
  computedResults: ComputedResults
  progression: number
  group: { name: string; href: string } | null
} | null> {
  const simulation = await getSimulation({
    userId,
    simulationId,
  })

  if (!simulation) {
    return null
  }

  let group: { name: string; href: string } | null = {
    name: '',
    href: '',
  }

  if (simulation.groups?.length) {
    const groupId = simulation.groups[0]
    const groupData = await fetchGroupById(groupId)

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

  return {
    computedResults: simulation.computedResults,
    progression: simulation.progression,
    group,
  }
}
