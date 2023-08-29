'use client'

import { PropsWithChildren, useEffect } from 'react'

import { useLocale } from '@/hooks/useLocale'
import { useRules } from '@/hooks/useRules'
import { SimulationProvider, useUser } from '@/publicodes-state'
import { Simulation } from '@/types/simulation'

type Props = {
  supportedRegions: any
}
export default function Providers({
  children,
  supportedRegions,
}: PropsWithChildren<Props>) {
  const {
    user,
    simulations,
    currentSimulation,
    initSimulation,
    updateSituationOfCurrentSimulation,
  } = useUser()

  const lang = useLocale()

  const { data: rules, isInitialLoading } = useRules({
    lang: lang || 'fr',
    region: supportedRegions[user.region?.code] ? user.region.code : 'FR',
  })

  useEffect(() => {
    if (!currentSimulation) {
      initSimulation()
    }
  }, [initSimulation, currentSimulation])

  return currentSimulation && !isInitialLoading ? (
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
        (simulations as Array<Simulation>).find(
          (simulation: Simulation) => simulation.id === currentSimulation
        )?.situation || {}
      }
      updateSituation={updateSituationOfCurrentSimulation}>
      {children}
    </SimulationProvider>
  ) : (
    'Initialisation'
  )
}
