'use client'

import Trans from '@/components/translation/Trans'
import {
  quizClickPass,
  quizClickPrevious,
} from '@/constants/tracking/pages/quiz'
import { simulationSimulationCompleted } from '@/constants/tracking/simulation'
import Button from '@/design-system/inputs/Button'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { getLinkToSimulateur } from '@/helpers/navigation/simulateurPages'
import { useEndPage } from '@/hooks/navigation/useEndPage'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useEngine } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'

type Props = {
  answer: string | null
  isAnswerValidated: boolean
  handleAnswerValidation: () => void
}
export default function Navigation({
  answer,
  isAnswerValidated,
  handleAnswerValidation,
}: Props) {
  const { t } = useClientTranslation()

  const { getNumericValue } = useEngine()

  const { getLinkToEndPage } = useEndPage()

  return (
    <div className="mb-8 flex justify-between border-b border-gray-200 pb-8">
      <ButtonLink
        onClick={() => {
          trackEvent(quizClickPrevious)
        }}
        href={getLinkToSimulateur({
          question: 'services sociétaux . question rhétorique', //TODO: should be dynamic
        })}
        color="secondary"
        title={t('revenir au test')}>
        ←
      </ButtonLink>

      {!answer ? (
        <ButtonLink
          color="secondary"
          href={getLinkToEndPage({
            allowedToGoToGroupDashboard: true,
          })}
          onClick={() => {
            trackEvent(
              simulationSimulationCompleted({ bilan: getNumericValue('bilan') })
            )
            trackEvent(quizClickPass)
          }}>
          <Trans>Passer la question →</Trans>
        </ButtonLink>
      ) : isAnswerValidated ? (
        <ButtonLink
          href={getLinkToEndPage()}
          onClick={() =>
            trackEvent(
              simulationSimulationCompleted({ bilan: getNumericValue('bilan') })
            )
          }>
          <Trans>Voir mes résultats →</Trans>
        </ButtonLink>
      ) : (
        <Button onClick={handleAnswerValidation}>
          <Trans>Valider</Trans>
        </Button>
      )}
    </div>
  )
}
