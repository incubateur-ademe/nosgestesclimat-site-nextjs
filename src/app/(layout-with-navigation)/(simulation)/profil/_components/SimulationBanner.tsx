'use client'

import { useCurrentSimulation } from '@/publicodes-state'
import SimulationNotStarted from './simulationBanner/SimulationNotStarted'
import SimulationStarted from './simulationBanner/SimulationStarted'

export default function SimulationBanner() {
  const { progression } = useCurrentSimulation()

  if (progression === 0) {
    return <SimulationNotStarted />
  }

  return <SimulationStarted />
}
