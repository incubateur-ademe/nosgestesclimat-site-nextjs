'use client'

import { ReactNode, useEffect } from 'react'

import rules from './co2-model.FR-lang.fr-opti.json'

import { SimulationProvider, useUser } from '@/publicodes-state'

export default function Providers({ children }: { children: ReactNode }) {
  const {
    simulations,
    currentSimulation,
    initSimulation,
    updateSituationOfCurrentSimulation,
  } = useUser()

  useEffect(() => {
    if (!currentSimulation) {
      initSimulation()
    }
  }, [initSimulation, currentSimulation])
  return currentSimulation ? (
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
