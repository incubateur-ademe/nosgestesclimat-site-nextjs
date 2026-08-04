'use client'

import type { Simulation } from '@/helpers/server/model/simulations'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import type { Situation, UpdateCurrentSimulationProps } from '../../types'
import useUser from '../useUser/useUser'

export type CurrentSimulation = Simulation & {
  update: (props: UpdateCurrentSimulationProps) => void
  updateCurrentSimulation: (props: UpdateCurrentSimulationProps) => void
}

/**
 * Stable fallbacks for callers that read a field of a possibly-absent
 * simulation. Inlining `?? {}` would mint a new object on every render and
 * invalidate every memo and effect that depends on these.
 */
export const EMPTY_SITUATION: Situation = {}
export const EMPTY_FOLDED_STEPS: DottedName[] = []
export const EMPTY_ACTION_CHOICES: Simulation['actionChoices'] = {}

/**
 * The current simulation, or `undefined` when the user has not taken the test
 * yet. Use this anywhere a visitor may legitimately have no simulation — which
 * is everywhere except the simulator flow.
 */
export function useOptionalSimulation(): CurrentSimulation | undefined {
  const { simulation, updateCurrentSimulation } = useUser()

  if (!simulation) return undefined

  return {
    ...simulation,
    update: updateCurrentSimulation,
    updateCurrentSimulation,
  }
}

/**
 * The current simulation, guaranteed.
 *
 * Only legal inside the simulator flow, where the usere is redirected when there is no
 * persisted simulation. Anywhere else, use `useOptionalSimulation()`.
 */
export default function useCurrentSimulation(): CurrentSimulation {
  const simulation = useOptionalSimulation()

  if (!simulation) {
    throw new Error(
      'useCurrentSimulation() requires a persisted simulation. Use useOptionalSimulation() outside the simulator flow.'
    )
  }

  return simulation
}
