'use server'

import { getSimulationResult as getSimulationResultService } from '@nosgestesclimat/core/features/simulations/services/get-simulation-result.service'

import type { SimulationResult } from '@/helpers/server/model/simulationResult'
import { getUserSession } from '@/services/auth/get-user-session'
import { notFound } from 'next/navigation'
import { toSimulationDto } from './simulation.dto'

type GetSimulationResultClientParams =
  | { by: 'latest'; withTendency: boolean }
  | { by: 'id'; id: string }

export const getSimulationResult = async (
  params: GetSimulationResultClientParams
): Promise<SimulationResult | null> => {
  const session = await getUserSession()
  if (!session) notFound()

  const result = await getSimulationResultService({
    ...params,
    userId: session.id,
  })

  if (!result) return null

  if (result.type === 'tendency') {
    return {
      ...result,
      simulation: toSimulationDto(result.simulation),
      previousSimulation: toSimulationDto(result.previousSimulation),
    }
  }

  return {
    ...result,
    simulation: toSimulationDto(result.simulation),
  }
}
