'use server'

import { SIMULATION_URL } from '@/constants/urls/main'
import type {
  ComputedResults,
  Simulation,
  Situation,
  Tendency,
} from '@/publicodes-state/types'
import { captureException } from '@sentry/nextjs'
import { fetchServer } from './fetchServer'
import { fetchGroupById } from './groups'
import { fetchPublicPollBySlug } from './organisations'
import { setDefaultExtendedSituation } from './utils/setDefaultExtendedSituation'

export interface SimulationResult {
  computedResults: ComputedResults
  previousComputedResults?: ComputedResults
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

// Allows unauthenticated users to fetch simulations
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

export const getTendency = ({
  previousCarbonFootprint,
  currentCarbonFootprint,
}: {
  previousCarbonFootprint?: number
  currentCarbonFootprint: number
}): Tendency | undefined => {
  if (
    !previousCarbonFootprint ||
    previousCarbonFootprint === currentCarbonFootprint
  ) {
    return undefined
  }

  if (previousCarbonFootprint < currentCarbonFootprint) return 'increase'
  return 'decrease'
}

export async function getSimulationResult({
  userId,
  simulationId,
  withPreviousResults,
}: {
  userId: string
  simulationId: string
  withPreviousResults?: boolean
}): Promise<SimulationResult | null> {
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

  let previousComputedResults = undefined
  if (withPreviousResults) {
    const allUserSimulations = await getUserSimulations({ userId })

    previousComputedResults = allUserSimulations.find(
      (sim) =>
        new Date(sim.date).getTime() < new Date(simulation.date).getTime() &&
        sim.progression === 1
    )?.computedResults
  }

  return {
    computedResults: simulation.computedResults,
    previousComputedResults,
    tendency: getTendency({
      previousCarbonFootprint: previousComputedResults?.carbone.bilan,
      currentCarbonFootprint: simulation.computedResults.carbone.bilan,
    }),
    situation: simulation.situation,
    progression: simulation.progression,
    date: simulation.date,
    group,
  }
}
