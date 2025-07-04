import { actionsClickAdditionalQuestion } from '@/constants/tracking/pages/actions'
import NotificationBubble from '@/design-system/alerts/NotificationBubble'
import { getCarbonFootprint } from '@/helpers/actions/getCarbonFootprint'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useRule } from '@/publicodes-state'
import type { TranslationFunctionType } from '@/types/translation'
import { trackEvent } from '@/utils/analytics/trackEvent'
import { getCorrectedValue } from '@/utils/getCorrectedValue'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import type { EvaluatedNode } from 'publicodes'

const getFormattedActionValue = (
  { t, i18n }: { t: TranslationFunctionType; i18n: any },
  actionValue: EvaluatedNode
) => {
  const correctedValue = getCorrectedValue(actionValue)

  if (correctedValue == undefined) {
    return {}
  }

  const [stringValue, unit] = getCarbonFootprint(
    { t, i18n },
    correctedValue,
    false,
    true
  )

  const sign = correctedValue > 0 ? '-' : '+'

  return { correctedValue, stringValue, unit, sign }
}

export default function ActionValue({
  total,
  isDisabled,
  hasFormula,
  dottedName,
  setActionWithFormOpen,
  remainingQuestions,
}: {
  total: number
  isDisabled: boolean
  hasFormula: boolean
  dottedName: DottedName
  setActionWithFormOpen: (dottedName: DottedName) => void
  remainingQuestions: DottedName[]
}) {
  const { t, i18n } = useClientTranslation()

  const { numericValue } = useRule(dottedName)

  const { correctedValue, stringValue, unit, sign } = getFormattedActionValue(
    { t, i18n },
    {
      nodeValue: numericValue,
      unit: { numerators: ['kgCO2'], denominators: [] },
      missingVariables: {},
    } as unknown as EvaluatedNode
  )

  if (correctedValue == undefined) {
    return
  }

  const relativeValue = Math.abs(Math.round(100 * (correctedValue / total)))

  if (numericValue === 0) return null

  if (hasFormula && isDisabled) {
    return <div>{t('Non applicable')}</div>
  }

  const remainingQuestionsText = t(
    'publicodes.ActionVignette.questionsRestantesText',
    {
      nbRemainingQuestions: remainingQuestions.length,
      pluralSuffix: remainingQuestions.length > 1 ? 's' : '',
    }
  )

  return (
    <button
      onClick={() => {
        trackEvent(actionsClickAdditionalQuestion(dottedName))
        setActionWithFormOpen(dottedName)
      }}>
      <div
        className={`border-primary-700 bg-primary-700 mb-6 inline-block rounded-[0.25rem] border-2 border-solid pr-[2px] pl-2 text-white ${
          correctedValue != undefined && correctedValue < 0 ? 'bg-red-500' : ''
        }${remainingQuestions && remainingQuestions.length > 0 ? 'blur-[2px] grayscale' : ''}`}>
        <span>
          {sign ?? ''}&nbsp;
          <strong>{stringValue}</strong>&nbsp;
          <span>{t(unit, { ns: 'units' })}</span>
        </span>

        {total && relativeValue > 0 && (
          <span className="bg-primary-100 text-primary-700 ml-2 rounded-e-sm px-1">
            {relativeValue}%
          </span>
        )}
      </div>

      {remainingQuestions && remainingQuestions.length > 0 && (
        <>
          <NotificationBubble
            onClick={() => setActionWithFormOpen(dottedName)}
            title={remainingQuestionsText}
            number={remainingQuestions.length}
          />
          <button
            className="text-primary-700 cursor-pointer text-sm"
            onClick={() => {
              trackEvent(actionsClickAdditionalQuestion(dottedName))
              setActionWithFormOpen(dottedName)
            }}>
            {remainingQuestionsText}
          </button>
        </>
      )}
    </button>
  )
}
