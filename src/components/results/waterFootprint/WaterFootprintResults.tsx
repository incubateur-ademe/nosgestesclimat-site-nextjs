import FootprintsLinks from '@/components/results/FootprintsLinks'
import { eauMetric } from '@/constants/model/metric'
import Title from '@/design-system/layout/Title'
import type { SimulationResult } from '@/helpers/server/model/simulationResult'
import type { Locale } from '@/i18nConfig'
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
  simulationResult: SimulationResult
  locale: Locale
  hideSaveBlock?: boolean
  basePathname: string
}

export default function WaterFootprintResults({
  simulationId,
  simulationResult,
  locale,
  hideSaveBlock = false,
  basePathname,
}: Props) {
  return (
    <>
      <FootprintsLinks
        locale={locale}
        simulationId={simulationId}
        currentPage="eau"
        basePathname={basePathname}
      />

      <FootprintBlock
        className="mb-12"
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

      <FootprintDetail
        computedResults={simulationResult.computedResults}
        locale={locale}
        metric={eauMetric}
      />

      <WhatIsWaterFootprint
        situation={simulationResult.situation}
        locale={locale}
      />

      <Title tag="h2" hasSeparator={false} size="lg" className="mb-8">
        <Trans locale={locale} i18nKey="simulation.eau.saveBlock.title">
          Retrouvez facilement vos résultats{' '}
        </Trans>
      </Title>

      {hideSaveBlock && <SaveResultsBlock locale={locale} />}

      <div className="mb-16 w-full md:w-2xl">
        <ClimateAndWater />

        <WaterActions locale={locale} />

        <DocumentationBlock locale={locale} />
      </div>
    </>
  )
}
