import { NodeValue } from '@/publicodes-state/types'

export function formatResultToDetailParam({
  categories,
  getValue,
}: {
  categories: string[]
  getValue: (dottedName: string) => NodeValue
}): string {
  const fullDetailString = categories.reduce((detailString, category) => {
    const value = getValue(
      category === 'transport' ? 'transport . empreinte' : category
    ) as number

    return `${detailString}${category[0]}${(
      Math.round(value ?? 0 / 10) / 1000
    ).toFixed(2)}`
  }, '')

  return `details=${fullDetailString}`
}
