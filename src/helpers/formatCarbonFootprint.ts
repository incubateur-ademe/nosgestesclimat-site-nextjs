import { NodeValue } from '@/publicodes-state/types'
type Options = {
  localize?: boolean
  locale?: string
  maximumFractionDigits?: number
  shouldUseAbbreviation?: boolean
}

export default function formatCarbonFootprint(
  value: NodeValue,
  {
    localize = true,
    locale = 'fr-FR',
    maximumFractionDigits = 1,
    shouldUseAbbreviation = false,
  }: Options = {
    localize: true,
    locale: 'fr-FR',
    maximumFractionDigits: 1,
    shouldUseAbbreviation: false,
  }
) {
  let numberValue = Number(value)

  const negative = numberValue < 0

  numberValue = Math.abs(numberValue)

  let tempValue = 0
  let unit = null

  if (numberValue > 0 && numberValue < 1) {
    tempValue = numberValue * 1000
    unit = 'g'
  }

  if (numberValue >= 1 && numberValue < 1000) {
    tempValue = numberValue
    unit = 'kg'
  }

  if (numberValue >= 1000) {
    tempValue = numberValue / 1000
    unit = shouldUseAbbreviation
      ? `tonne${numberValue === 1000 ? '' : 's'}`
      : 't'
  }

  return {
    formattedValue: localize
      ? tempValue.toLocaleString(locale, {
          maximumFractionDigits,
        })
      : tempValue,
    unit,
    negative,
  }
}
