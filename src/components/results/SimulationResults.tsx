import FinTabs from '@/app/[locale]/(simulation)/(large-nosticky)/fin/_components/FinTabs'
import { carboneMetric } from '@/constants/model/metric'
import { SIMULATOR_PATH } from '@/constants/urls/paths'
import { fetchSimulation } from '@/helpers/simulation/fetchSimulation'
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

export default async function SimulationResults({
  simulationId,
  locale,
  userId,
}: Props) {
  'use cache'
  cacheLife('weeks')
  cacheTag(`simulation-${simulationId}`)

  const simulation = await fetchSimulation({
    userId,
    simulationId,
  })

  if (!simulation) notFound()

  if (simulation.progression !== 1) {
    redirect(SIMULATOR_PATH)
  }

  return (
    <>
      <FinTabs />

      <FootprintBlock
        locale={locale}
        value={simulation.computedResults.carbone.bilan}
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
