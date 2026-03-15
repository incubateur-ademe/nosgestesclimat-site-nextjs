import type {
  ComputedResults,
  Simulation,
  Situation,
} from '@/publicodes-state/types'
import type { AppUser } from '../dal/user'
import { getGroup } from './groups'
import { getPublicPoll } from './poll'

export interface SimulationResult {
  computedResults: ComputedResults
  group: { name: string; href: string } | null
  /* @TODO we ship the whole situation because we need some dynamic result
  computed by the engine for the water result page. Once we have a proper
  logic for handling funfact, this should be removed, and the `eau domestique`
  should become a funfact / result, computed server side. */
  situation: Situation
}

export async function getSimulationResult({
  simulation,
  user,
}: {
  simulation: Simulation
  user: AppUser
}): Promise<SimulationResult> {
  let group: { name: string; href: string } | null = null
  if (simulation.groups?.length) {
    const groupId = simulation.groups[0].id
    const groupData = await getGroup({
      user,
      groupId,
    })
    group = {
      name: groupData.name,
      href: `/amis/resultats?groupId=${groupData.id}`,
    }
  }

  // If no group found, try to find an associated poll/campaign
  if (!group && simulation.polls?.length) {
    const poll = simulation.polls[0]
    const pollDetails = await getPublicPoll({
      user,
      pollIdOrSlug: poll.id,
    })
    group = {
      name: pollDetails.name,
      href: `/organisations/${pollDetails.organisation.slug}/campagnes/${poll.slug}`,
    }
  }

  return {
    computedResults: simulation.computedResults,
    group,
    situation: simulation.situation,
  }
}
