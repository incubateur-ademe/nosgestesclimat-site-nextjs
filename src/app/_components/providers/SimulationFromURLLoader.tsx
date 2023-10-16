'use client'

import { useLoadSimulationFromURL } from '@/hooks/useLoadSimulationFromURL'
import { useUser } from '@/publicodes-state'
import { useEffect } from 'react'

export default function SimulationFromURLLoader() {
  const { addSimulation, currentSimulationId } = useUser()

  const simulationFromURL = useLoadSimulationFromURL()

  useEffect(() => {
    if (simulationFromURL && currentSimulationId !== simulationFromURL.id) {
      addSimulation(simulationFromURL)
    }
  }, [simulationFromURL])

  return null
}
