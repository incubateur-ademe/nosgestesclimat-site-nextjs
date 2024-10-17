type Options = {
  localize?: boolean
  locale?: string
  maximumFractionDigits?: number
  shouldUseAbbreviation?: boolean
  shouldDivideBy365?: boolean
}

export function formatWaterFootprint(
  value: string | number,
  {
    localize = true,
    locale = 'fr-FR',
    maximumFractionDigits = 0,
    shouldUseAbbreviation = false,
    shouldDivideBy365 = true,
  }: Options = {
    localize: true,
    locale: 'fr-FR',
    maximumFractionDigits: 0,
    shouldUseAbbreviation: false,
    shouldDivideBy365: true,
  }
): {
  formattedValue: string
  unit: string | null
  negative: boolean
} {
  const numberValue = shouldDivideBy365 ? Number(value) / 365 : Number(value)

  const negative = numberValue < 0

  const absolutenumberValue = Math.abs(numberValue)

  const unit = shouldUseAbbreviation
    ? 'l'
    : // Doesn't work perfectly. For example 1.950.toFixed(1) = 1.9 but 1.950.toLocaleString('fr-FR', { maximumFractionDigits: 1 }) = 2
      Number(absolutenumberValue.toFixed(maximumFractionDigits)) < 2
      ? 'litre'
      : 'litres'

  return {
    formattedValue: localize
      ? numberValue.toLocaleString(locale, {
          maximumFractionDigits,
        })
      : numberValue.toFixed(maximumFractionDigits),
    unit,
    negative,
  }
}
