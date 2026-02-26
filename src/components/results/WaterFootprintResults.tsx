import FootprintsLinks from '@/app/[locale]/(server)/(large)/simulation/[simulationId]/resultats/_components/FootprintsLinks'
import ClimateAndWater from '@/app/[locale]/(server)/(large)/simulation/[simulationId]/resultats/eau/_components/ClimateAndWater'
import DocumentationBlock from '@/app/[locale]/(server)/(large)/simulation/[simulationId]/resultats/eau/_components/DocumentationBlock'
import IsItALot from '@/app/[locale]/(server)/(large)/simulation/[simulationId]/resultats/eau/_components/IsItALot'
import WaterActions from '@/app/[locale]/(server)/(large)/simulation/[simulationId]/resultats/eau/_components/WaterActions'
import WaterFootprintDetail from '@/app/[locale]/(server)/(large)/simulation/[simulationId]/resultats/eau/_components/WaterFootprintDetail'
import WhatIsWaterFootprint from '@/app/[locale]/(server)/(large)/simulation/[simulationId]/resultats/eau/_components/WhatIsWaterFootprint'
import FinTabs from '@/app/[locale]/(simulation)/(large-nosticky)/fin/_components/FinTabs'
import SaveResultsBlock from '@/app/[locale]/(simulation)/(large-nosticky)/fin/_components/SaveResultsBlock'
import { eauMetric } from '@/constants/model/metric'
import { getSimulationResult } from '@/helpers/server/model/simulations'
import { isUserAuthenticated } from '@/helpers/server/model/user'
import type { Locale } from '@/i18nConfig'
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
  // 'use cache'
  // cacheLife('days')
  // cacheTag(`simulation-${simulationId}`)

  const isAuthenticated = await isUserAuthenticated()

  const simulationResults = await getSimulationResult({
    userId,
    simulationId,
  })

  if (!simulationResults) notFound()

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

      <WaterFootprintDetail
        computedResults={simulationResults.computedResults}
        locale={locale}
      />

      <WhatIsWaterFootprint
        situation={simulationResults.situation}
        locale={locale}
      />

      <SaveResultsBlock locale={locale} isAuthentified={isAuthenticated} />

      <div className="mb-12 w-full md:w-2xl">
        <ClimateAndWater locale={locale} />

        <WaterActions locale={locale} />

        <DocumentationBlock locale={locale} />
      </div>
    </>
  )
}
