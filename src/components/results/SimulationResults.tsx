import FinTabs from '@/app/[locale]/(simulation)/(large-nosticky)/fin/_components/FinTabs'
import { carboneMetric } from '@/constants/model/metric'
import type { SimulationResult } from '@/helpers/server/model/simulationResult'
import type { Locale } from '@/i18nConfig'
import Trans from '../translation/trans/TransServer'
import FootprintBlock from './FootprintBlock'

interface Props {
  simulationResult: SimulationResult
  locale: Locale
}

export default function SimulationResults({ simulationResult, locale }: Props) {
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
