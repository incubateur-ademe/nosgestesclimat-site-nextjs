import FinTabs from '@/components/results/FinTabs'
import FootprintsLinks from '@/components/results/FootprintsLinks'
import { carboneMetric } from '@/constants/model/metric'
import Title from '@/design-system/layout/Title'
import type { SimulationResult } from '@/helpers/server/model/simulationResult'
import type { Locale } from '@/i18nConfig'
import Trans from '../../translation/trans/TransServer'
import FootprintBlock from '../FootprintBlock'
import FootprintDetail from '../FootprintDetail'
import SaveResultsBlock from '../SaveResultsBlock'
import Objective from '../objective/Objective'

interface Props {
  simulationId: string
  simulationResult: SimulationResult
  locale: Locale
}

export default function CarbonFootprintResults({
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
        currentPage="carbone"
      />

      <FootprintBlock
        className="mb-12"
        locale={locale}
        value={simulationResult.computedResults.carbone.bilan}
        title={
          <Trans locale={locale} i18nKey="simulation.carbone.title">
            Vous émettez environ
          </Trans>
        }
        metric={carboneMetric}
        unitSuffix={
          <Trans locale={locale} i18nKey="common.co2eAn">
            CO₂e / an
          </Trans>
        }
      />

      <FootprintDetail
        computedResults={simulationResult.computedResults}
        locale={locale}
        metric={carboneMetric}
      />

      <Title tag="h2" size="lg" hasSeparator={false} className="mb-8">
        <Trans locale={locale} i18nKey="carbonResults.saveBlock.title">
          Retrouvez facilement vos résultats
        </Trans>
      </Title>

      <SaveResultsBlock locale={locale} />

      <Objective
        locale={locale}
        carbonFootprint={simulationResult.computedResults.carbone.bilan}
      />

      <p className="text-primary-600 mx-auto mb-12 w-2xl max-w-full text-center">
        <Trans locale={locale} i18nKey="carbonResults.objective.description">
          <strong>Vous n’êtes pas seul. Chaque contexte est différent</strong>,{' '}
          on contribue à hauteur de ses possibilités, on veut vous y aider.
        </Trans>
      </p>
    </>
  )
}
