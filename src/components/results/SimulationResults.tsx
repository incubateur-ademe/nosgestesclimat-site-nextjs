import FinTabs from '@/app/[locale]/(simulation)/(large-nosticky)/fin/_components/FinTabs'
import { fetchSimulation } from '@/helpers/simulation/fetchSimulation'
import type { Locale } from '@/i18nConfig'
import { cacheLife, cacheTag } from 'next/cache'
import { notFound } from 'next/navigation'
import CarbonFootprint from './CarbonFootprint'

interface Props {
  simulationId: string
  locale: Locale
  userId: string
}

export default async function SimulationResultContent({
  simulationId,
  locale,
  userId,
}: Props) {
  'use cache'
  cacheLife('days')
  cacheTag(`simulation-${simulationId}`)

  const simulation = await fetchSimulation({
    userId,
    simulationId,
  })

  if (!simulation) notFound()

  return (
    <>
      <FinTabs />

      <CarbonFootprint
        locale={locale}
        value={simulation?.computedResults?.carbone?.bilan}
      />
    </>
  )
}
