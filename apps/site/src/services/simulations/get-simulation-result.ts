'use server'

import { getSimulation as getSimulationService } from '@nosgestesclimat/core/features/simulations/services/get-simulation.service'
import { prisma } from '@nosgestesclimat/core/prisma/client'

import type { SimulationResult } from '@/helpers/server/model/simulationResult'
import type { ComputedResults } from '@/publicodes-state/types'
import { getUserSession } from '@/services/auth/get-user-session'
import { notFound } from 'next/navigation'
import { getPoll } from '../polls/get-poll'

export const getSimulationResult = async (
  simulationId: string
): Promise<SimulationResult> => {
  const session = await getUserSession()
  if (!session) notFound()

  const simulation = await getSimulationService({
    id: simulationId,
    userId: session.id,
  })
  if (!simulation) notFound()

  const groupId = simulation.groups?.[0]?.id
  const pollId = simulation.polls?.[0]?.id

  const [groupData, pollData] = await Promise.all([
    groupId
      ? // TODO: make a repo method for this
        prisma.group.findUnique({
          where: { id: groupId },
          select: { id: true, name: true },
        })
      : Promise.resolve(null),
    pollId ? getPoll(pollId) : Promise.resolve(null),
  ])

  let group: { name: string; href: string } | null = null
  if (groupData) {
    group = {
      name: groupData.name,
      href: `/amis/resultats?groupId=${groupData.id}`,
    }
  } else if (pollData) {
    group = {
      name: pollData.name,
      href: `/organisations/${pollData.organisation.slug}/campagnes/${pollData.slug}`,
    }
  }

  return {
    computedResults: simulation.computedResults as ComputedResults,
    group,
  }
}
