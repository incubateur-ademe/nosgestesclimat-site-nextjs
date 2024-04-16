import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useRule } from '@/publicodes-state'
import { DottedName, NodeValue } from '@/publicodes-state/types'
import { TranslationFunctionType } from '@/types/translation'
import { getCorrectedValue } from '@/utils/getCorrectedValue'
import { getCarbonFootprint } from '../../../_helpers/getCarbonFootprint'

const getFormattedActionValue = (
  { t, i18n }: { t: TranslationFunctionType; i18n: any },
  actionValue: { nodeValue: NodeValue; unit: { numerators: string } }
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
  dottedName: DottedName
  isBlurred?: boolean
}) {
  const { t, i18n } = useClientTranslation()

  const { numericValue } = useRule(dottedName)

  const { correctedValue, stringValue, unit, sign } = getFormattedActionValue(
    { t, i18n },
    {
      nodeValue: numericValue,
      unit: { numerators: 'kgCO2' },
    }
  )

  if (correctedValue == undefined) {
    return
  }

  const relativeValue = Math.abs(Math.round(100 * (correctedValue / total)))

  if (numericValue === 0) return null

  if (hasFormula && isDisabled) {
    return <div>{t('Non applicable')}</div>
  }

  return (
    <div
      className={`mb-6 inline-block rounded-[0.25rem] border-2 border-solid border-primary-700 bg-primary-700 pl-2 pr-[2px] text-white ${
        correctedValue != undefined && correctedValue < 0 ? 'bg-red-500' : ''
      }${isBlurred ? 'blur-[2px] grayscale' : ''}`}>
      <span>
        {sign ?? ''}&nbsp;
        <strong>{stringValue}</strong>&nbsp;
        <span>{t(unit, { ns: 'units' })}</span>
      </span>

      {total && relativeValue > 0 && (
        <span className="ml-2 rounded-e-sm bg-primary-100 px-1 text-primary-700">
          {relativeValue}%
        </span>
      )}
    </div>
  )
}
