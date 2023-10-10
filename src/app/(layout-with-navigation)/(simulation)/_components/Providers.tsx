'use client'

import LocalisationBanner from '@/components/translation/LocalisationBanner'
import { orderedCategories } from '@/constants/orderedCategories'
import Loader from '@/design-system/layout/Loader'
import { useLocale } from '@/hooks/useLocale'
import { useRules } from '@/hooks/useRules'
import { SimulationProvider, useUser } from '@/publicodes-state'
import { SuppportedRegions } from '@/types/international'
import { usePathname, useRouter } from 'next/navigation'
import { PropsWithChildren, useEffect, useRef } from 'react'

type Props = {
  supportedRegions: SuppportedRegions
}
export default function Providers({
  children,
  supportedRegions,
}: PropsWithChildren<Props>) {
  const router = useRouter()

  const {
    user,
    tutorials,
    getCurrentSimulation,
    currentSimulationId,
    initSimulation,
    updateSituationOfCurrentSimulation,
    updateFoldedStepsOfCurrentSimulation,
  } = useUser()

  const lang = useLocale()

  const pathname = usePathname()

  const { data: rules, isInitialLoading } = useRules({
    lang,
    region: supportedRegions[user.region?.code] ? user.region.code : 'FR',
  })

  useEffect(() => {
    if (!tutorials.testIntro) {
      router.replace('/tutoriel')
    }
  }, [tutorials])

  const hasInitiatedSimulation = useRef(false)

  useEffect(() => {
    if (!currentSimulationId && !hasInitiatedSimulation.current) {
      hasInitiatedSimulation.current = true
      initSimulation()
    }
  }, [currentSimulationId, hasInitiatedSimulation, initSimulation])

  return currentSimulationId && !isInitialLoading ? (
    <SimulationProvider
      key={currentSimulationId}
      rules={rules}
      situation={getCurrentSimulation()?.situation || {}}
      updateSituation={updateSituationOfCurrentSimulation}
      foldedSteps={getCurrentSimulation()?.foldedSteps || []}
      addFoldedStep={updateFoldedStepsOfCurrentSimulation}
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
