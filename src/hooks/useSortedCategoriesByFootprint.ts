import { defaultMetric } from '@/constants/model/metric'
import { useEngine } from '@/publicodes-state'
import type { Metric } from '@/publicodes-state/types'
import { useMemo } from 'react'

type Props = {
  metric?: Metric
}
export function useSortedCategoriesByFootprint(
  { metric }: Props = { metric: defaultMetric }
) {
  const { getNumericValue, categories } = useEngine({ metric })

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => getNumericValue(category))
  }, [categories, getNumericValue])

  const sortedCategories = useMemo(() => {
    return filteredCategories.sort((categoryA, categoryB) => {
      const valueA = getNumericValue(categoryA) ?? 0
      const valueB = getNumericValue(categoryB) ?? 0

      return valueB - valueA
    })
  }, [filteredCategories, getNumericValue])

  return {
    sortedCategories,
  }
}
