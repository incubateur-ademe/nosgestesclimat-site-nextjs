'use server'

import { GROUP_URL } from '@/constants/urls/main'
import { UnauthorizedError } from '@/helpers/server/error'
import { fetchServer } from '@/helpers/server/fetchServer'
import type { Simulation } from '@/helpers/server/model/simulations'
import logger from '@/logger/logger.server'
import { getUserSession } from '@/services/auth/get-user-session'
import { ensureSimulationModel } from '@/services/simulations/ensure-simulation-model'
import type { Group } from '@/types/groups'
import type { Logger } from '@nosgestesclimat/core/features/logger/index'

export const createGroup = logger.withSpan(
  'site.action.createGroup',
  [],
  async ({
    name,
    emoji,
    administratorName,
    participants,
    logger,
  }: {
    name: string
    emoji: string
    administratorName: string
    participants?: { simulation: Simulation }[]
    logger: Logger
  }) => {
    const session = await getUserSession()
    if (!session?.isAuth) {
      throw new UnauthorizedError()
    }

    return await fetchServer<Group>(GROUP_URL, {
      method: 'POST',
      body: {
        name,
        emoji,
        administrator: {
          name: administratorName,
        },
        participants: participants
          ? await Promise.all(
              participants.map(async ({ simulation, ...rest }) => ({
                ...rest,
                simulation: await ensureSimulationModel(simulation, logger),
              }))
            )
          : undefined,
      },
    })
  }
)
