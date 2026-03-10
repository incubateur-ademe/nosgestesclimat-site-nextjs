import type { ComputedResults } from '@/publicodes-state/types'
import { cacheLife, cacheTag } from 'next/cache'
import type { AppUser } from '../dal/user'
import { getGroupById } from './groups'
import { getPublicPollBySlug } from './organisations'
import { getSimulation } from './simulations'

export interface SimulationResult {
  computedResults: ComputedResults
  progression: number
  group: { name: string; href: string } | null
}

export async function getSimulationResult({
  user,
  simulationId,
}: {
  user: AppUser
  simulationId: string
}): Promise<SimulationResult> {
  'use cache'
  cacheLife('weeks')
  cacheTag(`simulation-${simulationId}`)

  // This throws if no simulation is found
  const simulation = await getSimulation({
    user,
    simulationId,
  })

  let group: { name: string; href: string } | null = null

  if (simulation.groups?.length) {
    const groupId = simulation.groups[0]

    const groupData = await getGroupById({
      groupId,
      userId: user.id,
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
      userId: user.id,
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
