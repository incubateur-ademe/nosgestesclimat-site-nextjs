'use client'

import { useLoadSimulationFromURL } from '@/hooks/useLoadSimulationFromURL'
import { useUser } from '@/publicodes-state'
import { useEffect } from 'react'

export default function SimulationFromURLLoader() {
  const { addSimulation } = useUser()

  const simulationFromURL = useLoadSimulationFromURL()

  useEffect(() => {
    if (simulationFromURL) {
      addSimulation(simulationFromURL)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
