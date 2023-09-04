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
  isBlurred,
}: {
  total: number
  isDisabled: boolean
  hasFormula: boolean
  dottedName: string
  isBlurred?: boolean
}) {
  const { t, i18n } = useClientTranslation()

  const { getValue } = useEngine()

  const { correctedValue, stringValue, unit, sign } = getFormattedActionValue(
    { t, i18n },
    {
      nodeValue: getValue(dottedName),
      unit: { numerators: 'kgCO2' },
    }
  )

  if (correctedValue == undefined) {
    return
  }

  const relativeValue = Math.round(100 * (correctedValue / total))

  return (
    <div>
      {hasFormula && isDisabled ? (
        t('Non applicable')
      ) : (
        <div
          className={`inline-block rounded-[0.25rem] border-2 border-solid border-primary bg-primary pl-2 pr-[2px] text-white ${
            correctedValue != undefined && correctedValue < 0
              ? 'bg-red-500'
              : ''
          }${isBlurred ? 'blur-[2px] grayscale' : ''}`}>
          <span>
            {sign ?? ''}&nbsp;
            <strong>{stringValue}</strong>&nbsp;
            <span>{t(unit, { ns: 'units' })}</span>
          </span>
          {total && (
            <span className="ml-2 rounded-e-sm bg-primaryLight px-1 text-primaryDark">
              {Math.abs(relativeValue)}%
            </span>
          )}
        </div>
      )}
    </div>
  )
}
