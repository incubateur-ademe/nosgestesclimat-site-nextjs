'use server'

import { GROUP_RESULTS_ROUTE_PATTERN } from '@/constants/urls/paths'
import type { Simulation } from '@/helpers/server/model/simulations'
import { updateGroupParticipant } from '@/services/groups/update-group-participant'
import { revalidatePath } from 'next/cache'

/**
 * Switches the simulation the connected user takes part in the group with, then
 * refreshes the results page they are on so that it shows the new footprint.
 */
export const updateSimulationUsedAction = async ({
  groupId,
  simulation,
  name,
}: {
  groupId: string
  simulation: Simulation
  name: string
}) => {
  await updateGroupParticipant({ groupId, simulation, name })
  revalidatePath(GROUP_RESULTS_ROUTE_PATTERN, 'page')
}
