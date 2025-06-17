'use client'

import { useCurrentSimulation, useEngine } from '@/publicodes-state'
import SimulationNotStarted from './simulationBanner/SimulationNotStarted'
import SimulationSkeleton from './simulationBanner/SimulationSkeleton'
import SimulationStarted from './simulationBanner/SimulationStarted'

export default function SimulationBanner() {
  const { isInitialized } = useEngine()
  const { progression } = useCurrentSimulation()

  if (!isInitialized) {
    return <SimulationSkeleton />
  }

  if (progression === 0) {
    return <SimulationNotStarted />
  }

  return <SimulationStarted />
}
