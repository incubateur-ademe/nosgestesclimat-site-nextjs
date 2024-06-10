import { getNumericValue } from '@/publicodes-state/helpers/getNumericValue'
import { ComputedResults } from '@/publicodes-state/types'

export function getComputedResults(
  categories: string[],
  safeEvaluate: (ruleName: string) => any
) {
  return categories.reduce(
    (acc, category) => {
      acc.categories[category] = getNumericValue(category, safeEvaluate)
      return acc
    },
    {
      categories: {},
      bilan: getNumericValue('bilan', safeEvaluate),
    } as ComputedResults
  )
}
