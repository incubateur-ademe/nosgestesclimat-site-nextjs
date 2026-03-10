import type { ComputedResults } from '@/publicodes-state/types'
import { cacheLife, cacheTag } from 'next/cache'
import { getGroupById } from './groups'
import { getPublicPollBySlug } from './organisations'
import { getSimulation } from './simulations'

export interface SimulationResult {
  computedResults: ComputedResults
  progression: number
  group: { name: string; href: string } | null
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

  // This throws if no simulation is found
  const simulation = await getSimulation({
    userId,
    simulationId,
    auth: false,
  })

  // If no simulation an error is thrown by getSimulation
  // but we need this to avoid typing issues below
  if (!simulation) return null

  let group: { name: string; href: string } | null = null

  if (simulation.groups?.length) {
    const groupId = simulation.groups[0]

    const groupData = await getGroupById({
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
    const pollDetails = await getPublicPollBySlug({
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
