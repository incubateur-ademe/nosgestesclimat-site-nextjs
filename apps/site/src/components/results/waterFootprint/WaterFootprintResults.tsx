import { eauMetric } from '@/constants/model/metric'
import type { Locale } from '@/i18nConfig'
import type { ComputedResults } from '@/publicodes-state/types'
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
  computedResults: ComputedResults
  locale: Locale
  hideSaveBlock?: boolean
}

export default function WaterFootprintResults({
  computedResults,
  locale,
  hideSaveBlock = false,
}: Props) {
  return (
    <>
      <FootprintBlock
        className="mb-12"
        value={computedResults.eau.bilan}
        title={
          <Trans i18nKey="simulation.eau.title">
            L'empreinte eau qui sert à produire ce que vous consommez
          </Trans>
        }
        metric={eauMetric}
        unitSuffix={<Trans i18nKey="common.byDay">/ jour</Trans>}
      />

      <IsItALot />

      <FootprintDetail
        computedResults={computedResults}
        locale={locale}
        metric={eauMetric}
      />

      <WhatIsWaterFootprint />

      {!hideSaveBlock && <SaveResultsBlock />}

      <div className="mb-16 w-full md:w-2xl">
        <ClimateAndWater />

        <WaterActions />

        <DocumentationBlock />
      </div>
    </>
  )
}
