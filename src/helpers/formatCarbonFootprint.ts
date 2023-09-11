import { NodeValue } from '@/publicodes-state/types'

export default function formatCarbonFootprint(
  value: NodeValue,
  { localize = true, locale = 'fr-FR', maximumFractionDigits = 1 } = {
    localize: true,
    locale: 'fr-FR',
    maximumFractionDigits: 1,
  }
) {
  value = Number(value)
  const negative = value < 0

  value = Math.abs(value)

  let tempValue = 0
  let unit = null

  if (value > 0 && value < 1) {
    tempValue = value * 1000
    unit = 'g'
  }
  if (value >= 1 && value < 1000) {
    tempValue = value
    unit = 'kg'
  }
  if (value >= 1000) {
    tempValue = value / 1000
    unit = 'tonnes'
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
