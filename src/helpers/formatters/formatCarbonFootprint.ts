type Options = {
  localize?: boolean
  locale?: string
  maximumFractionDigits?: number
  shouldUseAbbreviation?: boolean
  t?: (key: string) => string
}

export function formatCarbonFootprint(
  value: string | number,
  {
    localize = true,
    locale = 'fr-FR',
    maximumFractionDigits = 1,
    shouldUseAbbreviation = false,
    t = (key) => key,
  }: Options = {
    localize: true,
    locale: 'fr-FR',
    maximumFractionDigits: 1,
    shouldUseAbbreviation: false,
  }
): {
  formattedValue: string
  unit: string | null
  negative: boolean
} {
  const numberValue = Number(value)

  const negative = numberValue < 0
  const absNumberValue = Math.abs(numberValue)

  let tempValue = 0
  let unit = null

  if (absNumberValue > 0 && absNumberValue < 1) {
    tempValue = absNumberValue * 1000
    unit = 'g'
  }

  if (absNumberValue >= 1 && absNumberValue < 1000) {
    tempValue = Math.round(absNumberValue)
    unit = 'kg'
  }

  if (absNumberValue >= 1000) {
    tempValue = absNumberValue / 1000
    unit = shouldUseAbbreviation
      ? 't'
      : // Doesn't work perfectly. For example 1.950.toFixed(1) = 1.9 but 1.950.toLocaleString('fr-FR', { maximumFractionDigits: 1 }) = 2
        Number(tempValue.toFixed(maximumFractionDigits)) < 2
        ? t('tonne')
        : t('tonnes')
  }

  if (negative) {
    tempValue = -tempValue
  }

  return {
    formattedValue: localize
      ? tempValue.toLocaleString(locale, {
          maximumFractionDigits,
        })
      : tempValue.toFixed(maximumFractionDigits),
    unit,
    negative,
  }
}
