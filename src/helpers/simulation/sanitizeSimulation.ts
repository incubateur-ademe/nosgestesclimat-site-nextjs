import type { Simulation } from '@/publicodes-state/types'

export function sanitizeSimulation(
  simulation: Simulation
): Omit<Simulation, 'user' | 'groups' | 'polls'> {
  const sanitized: Simulation & {
    createdAt?: string
    updatedAt?: string
  } = { ...simulation }
  delete sanitized.createdAt
  delete sanitized.updatedAt
  delete sanitized.user
  delete sanitized.groups
  delete sanitized.polls
  return sanitized
}
