'use client'

import IframeDataShareModal from '@/components/iframe/IframeDataShareModal'
import { useEndGuard } from '@/hooks/navigation/useEndGuard'
import { useSetCurrentSimulationFromParams } from '@/hooks/simulation/useSetCurrentSimulationFromParams'
import { useCurrentMetric } from '@/hooks/useCurrentMetric'
import Carbone from './_components/Carbone'
import Eau from './_components/Eau'
import Heading from './_components/Heading'
import MetricSlider from './_components/MetricSlider'
import Poll from './_components/Poll'
import TotalStickyMobile from './_components/TotalStickyMobile'

export default function FinPage() {
  // Guarding the route and redirecting if necessary
  const { isGuardInit, isGuardRedirecting } = useEndGuard()

  // Set the current simulation from the URL params (if applicable)
  const { isCorrectSimulationSet } = useSetCurrentSimulationFromParams()

  const currentMetric = useCurrentMetric()

  if (!isGuardInit || isGuardRedirecting) return null

  if (!isCorrectSimulationSet) return null

  return (
    <>
      <IframeDataShareModal />
      <Poll />

      <Heading />
      <MetricSlider currentMetric={currentMetric} />

      <TotalStickyMobile />

      {currentMetric === 'carbone' && <Carbone />}
      {currentMetric === 'eau' && <Eau />}
    </>
  )
}
