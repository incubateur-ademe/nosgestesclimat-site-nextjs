'use client'

import { useForm, useUser } from '@/publicodes-state'
import SimulationNotStarted from './simulationBanner/SimulationNotStarted'
import SimulationStarted from './simulationBanner/SimulationStarted'

export default function SimulationBanner() {
  const { progression } = useForm()

  const { getCurrentSimulation } = useUser()

  const currentSimulation = getCurrentSimulation()

  if (progression === 0 || !currentSimulation) {
    return <SimulationNotStarted />
  }

  return <SimulationStarted />
}
