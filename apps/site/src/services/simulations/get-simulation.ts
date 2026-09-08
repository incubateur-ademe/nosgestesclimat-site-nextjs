'use server'

import { getSimulation as getSimulationService } from '@nosgestesclimat/core/features/simulations/services/get-simulation.service'

import type { Simulation } from '@/helpers/server/model/simulations'
import { getUserSession } from '@/services/auth/get-user-session'
import { notFound, unauthorized } from 'next/navigation'
import { toSimulationDto } from './simulation.dto'

/** TODO: should be merged and renamed with getSimulationResult to match a "use case" */
export const getSimulation = async (
  simulationId: string
): Promise<Simulation> => {
  const session = await getUserSession()
  if (!session) unauthorized()

  const simulation = await getSimulationService({
    id: simulationId,
    userId: session.id,
  })
  if (!simulation) notFound()

  return toSimulationDto(simulation)
}
