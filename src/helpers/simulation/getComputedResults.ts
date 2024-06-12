import { getDisposableEngine } from '@/publicodes-state/helpers/getDisposableEngine'
import { getNumericValue } from '@/publicodes-state/helpers/getNumericValue'
import { ComputedResults, Rules, Situation } from '@/publicodes-state/types'

type Props = {
  situation: Situation
  categories: string[]
  rules: Rules
}

export function getComputedResults({ situation, categories, rules }: Props) {
  const { safeEvaluate } = getDisposableEngine({
    rules,
    situation,
  })

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
