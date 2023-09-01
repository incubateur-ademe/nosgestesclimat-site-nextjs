import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useEngine } from '@/publicodes-state'
import { TranslationFunctionType } from '@/types/translation'
import { getCorrectedValue } from '@/utils/getCorrectedValue'
import { getCarbonFootprint } from '../../../_helpers/getCarbonFootprint'

export const getFormattedActionValue = (
  { t, i18n }: { t: TranslationFunctionType; i18n: any },
  actionValue: { nodeValue: number; unit: { numerators: string } }
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
}: {
  total: number
  isDisabled: boolean
  hasFormula: boolean
  dottedName: string
}) {
  const { t, i18n } = useClientTranslation()

  const { getValue } = useEngine()

  const { correctedValue, stringValue, unit, sign } = getFormattedActionValue(
    { t, i18n },
    getValue(dottedName)
  )

  if (correctedValue == undefined) {
    return
  }

  const relativeValue = Math.round(100 * (correctedValue / total))

  return (
    <div className="text-center">
      {hasFormula && isDisabled ? (
        t('Non applicable')
      ) : (
        <div>
          {sign}&nbsp;
          <span
            className={`bg-primary rounded-sm text-white px-2 border-2 border-solid border-primary ${
              correctedValue != undefined && correctedValue < 0
                ? 'bg-red-500'
                : ''
            }`}>
            <strong>{stringValue}</strong>&nbsp;
            <span>{t(unit, { ns: 'units' })}</span>
            {total && (
              <span className="ml-2 px-2 bg-primaryLight rounded-s-sm">
                {Math.abs(relativeValue)}%
              </span>
            )}
          </span>
        </div>
      )}
    </div>
  )
}
