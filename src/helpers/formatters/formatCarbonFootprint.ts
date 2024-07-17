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
    tempValue = Math.round(numberValue)
    unit = 'kg'
  }

  if (numberValue >= 1000) {
    tempValue = numberValue / 1000
    unit = shouldUseAbbreviation
      ? 't'
      : // Doesn't work perfectly. For example 1.950.toFixed(1) = 1.9 but 1.950.toLocaleString('fr-FR', { maximumFractionDigits: 1 }) = 2
        Number(tempValue.toFixed(maximumFractionDigits)) < 2
        ? t('tonne')
        : t('tonnes')
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
