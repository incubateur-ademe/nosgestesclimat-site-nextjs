'use server'

import { GROUP_URL } from '@/constants/urls/main'
import type { Group } from '@/types/groups'
import { fetchServer } from '../fetchServer'
import { setDefaultExtendedSituation } from './utils/setDefaultExtendedSituation'

export async function getGroups(): Promise<Group[]> {
  const groups = await fetchServer<Group[]>(GROUP_URL)

  return groups.map(withOwnSimulationCompleted)
}

export async function getGroup({
  groupId,
}: {
  groupId: string
}): Promise<Group> {
  const group = await fetchServer<Group>(`${GROUP_URL}/${groupId}`)

  return withOwnSimulationCompleted(group)
}

/**
 * Completes the connected user's own simulation, the only one the group
 * endpoint returns in full.
 *
 * No read path selects `extendedSituation` server-side, so it has to be
 * defaulted here for the participant to hold a whole `Simulation` — the very
 * same normalisation `getSimulations` applies to the simulations endpoint.
 */
const withOwnSimulationCompleted = (group: Group): Group => ({
  ...group,
  participants: group.participants.map((participant) =>
    participant.userId
      ? {
          ...participant,
          simulation: setDefaultExtendedSituation(participant.simulation),
        }
      : participant
  ),
})
