export const humanWeight = (
  { t }, // We need to be passed as an argument instead of calling useTranslation inside the body, to avoid 'Rendered more hooks than during the previous render.'
  possiblyNegativeValue,
  concise = false,
  noSign,
  abrvLocale
) => {
  const v = Math.abs(possiblyNegativeValue)
  const [raw, unit, digits] =
    v === 0
      ? [v, '', 0]
      : v < 1
      ? [v * 1000, 'g', 1]
      : v < 1000
      ? [v, 'kg', 0]
      : [v / 1000, concise ? 't' : v > 2000 ? t('tonnes') : t('tonne'), 1]

  const signedValue = raw * (possiblyNegativeValue < 0 ? -1 : 1)
  const resultValue = noSign ? raw : signedValue
  const value = resultValue.toLocaleString(abrvLocale, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })

  return [value, unit]
}
