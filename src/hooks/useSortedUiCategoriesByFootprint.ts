import { useEngine, useSimulation } from '@/publicodes-state'
import { DottedName } from '@/publicodes-state/types'
import { useMemo } from 'react'

export function useSortedUiCategoriesByFootprint() {
  const { everyUiCategories } = useSimulation()
  const { getNumericValue } = useEngine()

  const sortedUiCategories = useMemo<DottedName[]>(() => {
    return everyUiCategories.sort(
      (categoryA: DottedName, categoryB: DottedName) => {
        const valueA = getNumericValue(categoryA) ?? 0
        const valueB = getNumericValue(categoryB) ?? 0

        return valueB - valueA
      }
    )
  }, [everyUiCategories, getNumericValue])

  return {
    sortedUiCategories,
  }
}
