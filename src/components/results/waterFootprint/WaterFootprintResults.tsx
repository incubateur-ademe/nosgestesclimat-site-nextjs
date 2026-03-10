import QueryClientProviderWrapper from '@/app/[locale]/_components/mainLayoutProviders/QueryClientProviderWrapper'
import FinTabs from '@/components/results/FinTabs'
import FootprintsLinks from '@/components/results/FootprintsLinks'
import { eauMetric } from '@/constants/model/metric'
import type { SimulationResult } from '@/helpers/server/model/simulationResult'
import type { Locale } from '@/i18nConfig'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Trans from '../../translation/trans/TransServer'
import FootprintBlock from '../FootprintBlock'
import SaveResultsBlock from '../SaveResultsBlock'
import ClimateAndWater from './_components/ClimateAndWater'
import DocumentationBlock from './_components/DocumentationBlock'
import IsItALot from './_components/IsItALot'
import WaterActions from './_components/WaterActions'
import WaterFootprintDetail from './_components/WaterFootprintDetail'

interface Props {
  simulationId: string
  simulationResult: SimulationResult
  locale: Locale
}

const WhatIsWaterFootprint = dynamic(
  () => import('./_components/WhatIsWaterFootprint')
)

export default function WaterFootprintResults({
  simulationId,
  simulationResult,
  locale,
}: Props) {
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
        value={simulationResult.computedResults.eau.bilan}
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
        computedResults={simulationResult.computedResults}
        locale={locale}
      />

      <Suspense>
        <QueryClientProviderWrapper>
          <WhatIsWaterFootprint situation={simulationResult.situation} />
        </QueryClientProviderWrapper>
      </Suspense>

      <h2 className="title-lg mb-8">
        <Trans locale={locale} i18nKey="simulation.eau.saveBlock.title">
          Retrouvez facilement vos résultats{' '}
        </Trans>
      </h2>

      <SaveResultsBlock locale={locale} />

      <div className="mb-16 w-full md:w-2xl">
        <ClimateAndWater locale={locale} />

        <WaterActions locale={locale} />

        <DocumentationBlock locale={locale} />
      </div>
    </>
  )
}
