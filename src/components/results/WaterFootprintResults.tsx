import FinTabs from '@/app/[locale]/(simulation)/(large-nosticky)/fin/_components/FinTabs'
import { eauMetric } from '@/constants/model/metric'
import { fetchSimulation } from '@/helpers/simulation/fetchSimulation'
import type { Locale } from '@/i18nConfig'
import { cacheLife, cacheTag } from 'next/cache'
import { notFound } from 'next/navigation'
import Trans from '../translation/trans/TransServer'
import FootprintBlock from './FootprintBlock'

interface Props {
  simulationId: string
  locale: Locale
  userId: string
}

export default async function WaterFootprintResults({
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

      <FootprintBlock
        locale={locale}
        value={simulation?.computedResults?.eau?.bilan}
        metric={eauMetric}
        unitSuffix={
          <Trans locale={locale as string} i18nKey="common.parAn">
            / an
          </Trans>
        }
      />
    </>
  )
}
