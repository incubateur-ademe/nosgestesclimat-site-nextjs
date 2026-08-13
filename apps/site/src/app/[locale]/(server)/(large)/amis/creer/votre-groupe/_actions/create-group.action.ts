'use server'

import { TUTORIAL_PATH } from '@/constants/urls/paths'
import { getLinkToGroupDashboard } from '@/helpers/navigation/groupPages'
import type { Simulation } from '@/helpers/server/model/simulations'
import { createGroup } from '@/services/groups/create-group'
import { updateGroupParticipant } from '@/services/groups/update-group-participant'
import { failure, type Result } from '@nosgestesclimat/core/lib/result'
import { redirect } from 'next/navigation'
import { CreateGroupError } from './errors'

/**
 * Creates the group then navigates. The redirect is issued server-side (via
 * `redirect()`) so that the navigation does not depend on a client-side
 * `router.push` after a server action, which can be dropped once the
 * transition settles (observed with `cacheComponents`).
 */
export const createGroupAction = async ({
  name,
  emoji,
  administratorName,
  lastSimulation,
}: {
  name: string
  emoji: string
  administratorName: string
  /** The visitor's last completed simulation, taken as their participation */
  lastSimulation?: Simulation
}): Promise<Result<void, CreateGroupError>> => {
  let groupId: string

  try {
    const group = await createGroup({
      name,
      emoji,
      administratorName,
      participants: lastSimulation
        ? [{ simulation: lastSimulation }]
        : undefined,
    })
    groupId = group.id

    if (!lastSimulation) {
      await updateGroupParticipant({ groupId, name: administratorName })
    }
  } catch {
    return failure(new CreateGroupError())
  }

  if (lastSimulation) {
    redirect(getLinkToGroupDashboard({ groupId }))
  }

  redirect(TUTORIAL_PATH)
}
