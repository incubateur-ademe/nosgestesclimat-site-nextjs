'use client'

import { ReactNode, useEffect } from 'react'

import { useRules } from '@/hooks/useRules'
import { SimulationProvider, useUser } from '@/publicodes-state'

export default function Providers({ children }: { children: ReactNode }) {
  const {
    user,
    simulations,
    currentSimulation,
    initSimulation,
    updateSituationOfCurrentSimulation,
  } = useUser()

  const { data: rules, isFetched } = useRules({
    language: user.language || 'fr',
    region: user.region || 'FR',
  })

  useEffect(() => {
    if (!currentSimulation) {
      initSimulation()
    }
  }, [initSimulation, currentSimulation])

  return currentSimulation && isFetched ? (
    <SimulationProvider
      key={currentSimulation}
      rules={rules}
      categoryOrder={[
        'transport',
        'alimentation',
        'logement',
        'divers',
        'services sociétaux',
      ]}
      loader={<div>Loading</div>}
      situation={
        simulations.find(
          (simulation: any) => simulation.id === currentSimulation
        )?.situation || {}
      }
      updateSituation={updateSituationOfCurrentSimulation}>
      {children}
    </SimulationProvider>
  ) : (
    'Initialisation'
  )
}
