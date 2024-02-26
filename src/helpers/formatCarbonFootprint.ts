type Options = {
  localize?: boolean
  locale?: string
  maximumFractionDigits?: number
  shouldUseAbbreviation?: boolean
}

export default function formatCarbonFootprint(
  value: string | number,
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
  let numberValue = typeof value === 'number' ? value : parseFloat(value)

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
    unit = shouldUseAbbreviation ? 't' : `tonne${numberValue < 2000 ? '' : 's'}`
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
