import { DottedName, NodeValue, Simulation } from '@/publicodes-state/types'

// TODO: Kill this function in favor of formatResultToDetailParam_NEW
export function formatResultToDetailParam({
  categories,
  getValue,
}: {
  categories: string[]
  getValue: (dottedName: DottedName) => NodeValue
}): string {
  const fullDetailString = categories.reduce((detailString, category) => {
    const value = getValue(category) as number

    return `${detailString}${category[0]}${(
      Math.round(value ?? 0 / 10) / 1000
    ).toFixed(2)}`
  }, '')

  return `details=${fullDetailString}`
}

export function formatResultToDetailParam_NEW({
  simulation,
}: {
  simulation: Simulation
}): string {
  const categories = simulation.computedResults?.categories

  if (!categories) return ''

  const paramString = Object.keys(categories).reduce(
    (paramString, category) => {
      const value = categories[category]

      return `${paramString}${category.charAt(0)}=${(
        Math.round(value ?? 0 / 10) / 1000
      ).toFixed(2)}`
    },
    'details='
  )

  return paramString
}
