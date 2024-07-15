import { useEngine, useSimulation } from '@/publicodes-state'
import { DottedName, Metric } from '@/publicodes-state/types'
import { useMemo } from 'react'

type Props = {
  metric?: Metric
}
export function useSortedUiCategoriesByFootprint({ metric }: Props = {}) {
  const { everyUiCategories } = useSimulation()
  const { getNumericValue } = useEngine({ metric })

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
