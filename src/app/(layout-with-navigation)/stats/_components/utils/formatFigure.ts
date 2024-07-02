export function formatFigure(number: number): string {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0')
}

export function formatPercentage(number: number): string {
  return `${(number * 100).toFixed(0)} %`
}
