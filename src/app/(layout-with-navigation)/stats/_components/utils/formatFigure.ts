export function formatValue(value: number, locale: Intl.LocalesArgument) {
  return value ? value.toLocaleString(locale) : '-'
}

export function formatPercentage(number: number): string {
  return `${(number * 100).toFixed(0)} %`
}
