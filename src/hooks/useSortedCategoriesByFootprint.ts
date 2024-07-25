import { defaultMetric } from '@/constants/metric'
import { useEngine, useSimulation } from '@/publicodes-state'
import { Metric } from '@/publicodes-state/types'
import { useMemo } from 'react'

type Props = {
  metric?: Metric
}
export function useSortedCategoriesByFootprint(
  { metric }: Props = { metric: defaultMetric }
) {
  const { categories } = useSimulation()
  const { getNumericValue } = useEngine({ metric })

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
