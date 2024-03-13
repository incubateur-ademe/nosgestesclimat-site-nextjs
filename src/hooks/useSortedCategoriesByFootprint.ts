import { useEngine, useSimulation } from '@/publicodes-state'
import { useMemo } from 'react'

export function useSortedCategoriesByFootprint() {
  const { categories } = useSimulation()
  const { getNumericValue } = useEngine()

  const sortedCategories = useMemo(() => {
    return categories.sort((categoryA, categoryB) => {
      const valueA = getNumericValue(categoryA) ?? 0
      const valueB = getNumericValue(categoryB) ?? 0

      return valueB - valueA
    })
  }, [categories, getNumericValue])

  return {
    sortedCategories,
  }
}
