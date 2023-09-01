'use client'

import { PropsWithChildren, useEffect } from 'react'

import Loader from '@/design-system/layout/Loader'
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
    currentSimulationId,
    initSimulation,
    updateSituationOfCurrentSimulation,
  } = useUser()

  const lang = useLocale()

  const { data: rules, isInitialLoading } = useRules({
    lang: lang || 'fr',
    region: supportedRegions[user.region?.code] ? user.region.code : 'FR',
  })

  useEffect(() => {
    if (!currentSimulationId) {
      initSimulation()
    }
  }, [initSimulation, currentSimulationId])

  return currentSimulationId && !isInitialLoading ? (
    <SimulationProvider
      key={currentSimulationId}
      rules={rules}
      categoryOrder={[
        'transport',
        'alimentation',
        'logement',
        'divers',
        'services sociétaux',
      ]}
      situation={
        (simulations as Array<Simulation>).find(
          (simulation: Simulation) => simulation.id === currentSimulationId
        )?.situation || {}
      }
      updateSituation={updateSituationOfCurrentSimulation}>
      {children}
    </SimulationProvider>
  ) : (
    <Loader color="dark" />
  )
}
