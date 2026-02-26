import FinTabs from '@/app/[locale]/(simulation)/(large-nosticky)/fin/_components/FinTabs'
import { carboneMetric } from '@/constants/model/metric'
import { SIMULATOR_PATH } from '@/constants/urls/paths'
import { getSimulationResult } from '@/helpers/server/model/simulations'
import type { Locale } from '@/i18nConfig'
import { cacheLife, cacheTag } from 'next/cache'
import { notFound, redirect } from 'next/navigation'
import Trans from '../translation/trans/TransServer'
import FootprintBlock from './FootprintBlock'

interface Props {
  simulationId: string
  locale: Locale
  userId: string
}

async function getCachedSimulationResult({
  userId,
  simulationId,
}: {
  userId: string
  simulationId: string
}) {
  'use cache'
  cacheLife('weeks')
  cacheTag(`simulation-${simulationId}`)

  return getSimulationResult({ userId, simulationId })
}

export default async function SimulationResults({
  simulationId,
  locale,
  userId,
}: Props) {
  const simulationResult = await getCachedSimulationResult({
    userId,
    simulationId,
  })

  if (!simulationResult) notFound()

  if (simulationResult.progression !== 1) {
    redirect(SIMULATOR_PATH)
  }

  return (
    <>
      <FinTabs />

      <FootprintBlock
        locale={locale}
        value={simulationResult.computedResults.carbone.bilan}
        metric={carboneMetric}
        unitSuffix={
          <Trans locale={locale as string} i18nKey="common.co2eAn">
            CO₂e / an
          </Trans>
        }
      />
    </>
  )
}
