'use client'

import LocalisationBanner from '@/components/translation/LocalisationBanner'
import { orderedCategories } from '@/constants/orderedCategories'
import Loader from '@/design-system/layout/Loader'
import { useLocale } from '@/hooks/useLocale'
import { useRules } from '@/hooks/useRules'
import { SimulationProvider, useUser } from '@/publicodes-state'
import { SuppportedRegions } from '@/types/international'
import { usePathname } from 'next/navigation'
import { PropsWithChildren, useEffect } from 'react'

type Props = {
  supportedRegions: SuppportedRegions
  isOptim?: boolean
}

const NO_MODEL_PATHNAME_EXCEPTIONS = ['/tutoriel', '/organisations']

export default function Providers({
  children,
  supportedRegions,
  isOptim = true,
}: PropsWithChildren<Props>) {
  const {
    user,
    getCurrentSimulation,
    currentSimulationId,
    initSimulation,
    updateCurrentSimulation,
    updateSituationOfCurrentSimulation,
    updateProgressionOfCurrentSimulation,
    updateFoldedStepsOfCurrentSimulation,
  } = useUser()

  const lang = useLocale()

  const pathname = usePathname()

  const { data: rules, isInitialLoading } = useRules({
    lang,
    region: supportedRegions[user.region?.code] ? user.region.code : 'FR',
    isOptim: isOptim,
  })

  useEffect(() => {
    if (!currentSimulationId) {
      initSimulation()
    }
  }, [currentSimulationId, initSimulation])

  if (NO_MODEL_PATHNAME_EXCEPTIONS.includes(pathname)) {
    return <>{children}</>
  }

  return currentSimulationId && !isInitialLoading ? (
    <SimulationProvider
      key={currentSimulationId}
      rules={rules}
      situation={getCurrentSimulation()?.situation || {}}
      updateSimulation={updateCurrentSimulation}
      updateSituation={updateSituationOfCurrentSimulation}
      updateProgression={updateProgressionOfCurrentSimulation}
      foldedSteps={getCurrentSimulation()?.foldedSteps || []}
      addFoldedStep={updateFoldedStepsOfCurrentSimulation}
      shouldAlwaysDisplayChildren={pathname === '/tutoriel'}
      categoryOrder={orderedCategories}>
      <LocalisationBanner supportedRegions={supportedRegions} />
      {children}
    </SimulationProvider>
  ) : (
    <div className="flex flex-1 items-center justify-center">
      <Loader color="dark" />
    </div>
  )
}
