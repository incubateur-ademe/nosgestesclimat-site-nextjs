'use client'

import Loader from '@/design-system/layout/Loader'
import { useLocale } from '@/hooks/useLocale'
import { useRules } from '@/hooks/useRules'
import { SimulationProvider, useUser } from '@/publicodes-state'
import FormProvider from '@/publicodes-state/formProvider'
import { Simulation } from '@/types/simulation'
import { usePathname } from 'next/navigation'
import { PropsWithChildren, useEffect } from 'react'

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

  const pathname = usePathname()

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
      <FormProvider>{children}</FormProvider>
    </SimulationProvider>
  ) : pathname === '/tutoriel' ? (
    children
  ) : (
    <Loader color="dark" />
  )
}
