'use client'

import LocalisationBanner from '@/components/translation/LocalisationBanner'
import { orderedCategories } from '@/constants/orderedCategories'
import Loader from '@/design-system/layout/Loader'
import { useRules } from '@/hooks/useRules'
import { SimulationProvider, useUser } from '@/publicodes-state'
import { SuppportedRegions } from '@/types/international'
import { usePathname } from 'next/navigation'
import { PropsWithChildren, useEffect } from 'react'

type Props = {
  supportedRegions: SuppportedRegions
}
export default function Providers({
  children,
  supportedRegions,
}: PropsWithChildren<Props>) {
  const {
    getCurrentSimulation,
    currentSimulationId,
    initSimulation,
    updateSituationOfCurrentSimulation,
    updateProgressionOfCurrentSimulation,
    updateFoldedStepsOfCurrentSimulation,
  } = useUser()

  const pathname = usePathname()

  const { data: rules, isLoading } = useRules()

  console.log('rules', rules)
  useEffect(() => {
    if (!currentSimulationId) {
      initSimulation()
    }
  }, [currentSimulationId, initSimulation])

  return currentSimulationId && !isLoading ? (
    <SimulationProvider
      key={currentSimulationId}
      rules={rules}
      situation={getCurrentSimulation()?.situation || {}}
      updateSituation={updateSituationOfCurrentSimulation}
      updateProgression={updateProgressionOfCurrentSimulation}
      foldedSteps={getCurrentSimulation()?.foldedSteps || []}
      addFoldedStep={updateFoldedStepsOfCurrentSimulation}
      shouldAlwaysDisplayChildren={pathname === '/tutoriel'}
      categoryOrder={orderedCategories}>
      <LocalisationBanner supportedRegions={supportedRegions} />
      {children}
    </SimulationProvider>
  ) : pathname === '/tutoriel' ? (
    children
  ) : (
    <div className="flex flex-1 items-center justify-center">
      <Loader color="dark" />
    </div>
  )
}
