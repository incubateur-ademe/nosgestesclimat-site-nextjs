import FinTabs from '@/components/results/FinTabs'
import FootprintsLinks from '@/components/results/FootprintsLinks'
import { eauMetric } from '@/constants/model/metric'
import { SIMULATOR_PATH } from '@/constants/urls/paths'
import { getSimulationResult } from '@/helpers/server/model/simulations'
import { isUserAuthenticated } from '@/helpers/server/model/user'
import type { Locale } from '@/i18nConfig'
import { cacheLife, cacheTag } from 'next/cache'
import { notFound, redirect } from 'next/navigation'
import Trans from '../../translation/trans/TransServer'
import FootprintBlock from '../FootprintBlock'
import FootprintDetail from '../FootprintDetail'
import SaveResultsBlock from '../SaveResultsBlock'
import ClimateAndWater from './_components/ClimateAndWater'
import DocumentationBlock from './_components/DocumentationBlock'
import IsItALot from './_components/IsItALot'
import WaterActions from './_components/WaterActions'
import WhatIsWaterFootprint from './_components/WhatIsWaterFootprint'

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

export default async function WaterFootprintResults({
  simulationId,
  locale,
  userId,
}: Props) {
  const isAuthenticated = await isUserAuthenticated()

  const simulationResults = await getCachedSimulationResult({
    userId,
    simulationId,
  })

  if (!simulationResults) notFound()

  if (simulationResults.progression !== 1) {
    redirect(SIMULATOR_PATH)
  }

  return (
    <>
      <FinTabs />

      <FootprintsLinks
        locale={locale}
        simulationId={simulationId}
        currentPage="eau"
      />

      <FootprintBlock
        locale={locale}
        value={simulationResults.computedResults.eau.bilan}
        title={
          <Trans locale={locale} i18nKey="simulation.eau.title">
            L’empreinte eau qui sert à produire ce que vous consommez
          </Trans>
        }
        metric={eauMetric}
        unitSuffix={
          <Trans locale={locale} i18nKey="common.parAn">
            / an
          </Trans>
        }
      />

      <IsItALot locale={locale} />

      <FootprintDetail
        computedResults={simulationResults.computedResults}
        locale={locale}
        metric={eauMetric}
      />

      <WhatIsWaterFootprint
        situation={simulationResults.situation}
        locale={locale}
      />

      <h2 className="title-lg mb-8">
        <Trans locale={locale} i18nKey="simulation.eau.saveBlock.title">
          Retrouvez facilement vos résultats{' '}
        </Trans>
      </h2>
      <SaveResultsBlock locale={locale} isAuthentified={isAuthenticated} />

      <div className="mb-16 w-full md:w-2xl">
        <ClimateAndWater locale={locale} />

        <WaterActions locale={locale} />

        <DocumentationBlock locale={locale} />
      </div>
    </>
  )
}
