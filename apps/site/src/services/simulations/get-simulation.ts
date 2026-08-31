'use server'

import { SIMULATION_URL } from '@/constants/urls/main'
import { UnauthorizedError } from '@/helpers/server/error'
import { fetchServer } from '@/helpers/server/fetchServer'
import type { Simulation } from '@/helpers/server/model/simulations'
import { getUserSession } from '@/services/auth/get-user-session'

export const getSimulation = async (
  simulationId: string
): Promise<Simulation> => {
  const session = await getUserSession()
  if (!session) throw new UnauthorizedError()

  const simulation = await fetchServer<Simulation>(
    `${SIMULATION_URL}/${simulationId}`
  )

  delete simulation.user

  return simulation
}
