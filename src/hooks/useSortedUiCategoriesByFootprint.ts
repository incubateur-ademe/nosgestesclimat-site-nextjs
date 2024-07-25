import { useEngine, useSimulation } from '@/publicodes-state'
import { DottedName, Metric } from '@/publicodes-state/types'
import { useMemo } from 'react'

type Props = {
  metric?: Metric
}
export function useSortedUiCategoriesByFootprint({ metric }: Props = {}) {
  const { everyUiCategories } = useSimulation()
  const { getNumericValue } = useEngine({ metric })

  // This is temporary until we decide if we want to show the repas categories in the water footprint
  const everyUiCategoriesWithRepasAjusted = useMemo(
    () =>
      metric === 'eau'
        ? [
            ...everyUiCategories.filter(
              (category) =>
                !['viande', 'végé', 'poisson'].some((repasDottedName) =>
                  category.includes(repasDottedName)
                )
            ),
            'alimentation . déjeuner et dîner',
          ]
        : (everyUiCategories as DottedName[]),
    [everyUiCategories, metric]
  )

  const sortedUiCategories = useMemo<DottedName[]>(() => {
    return everyUiCategoriesWithRepasAjusted.sort(
      (categoryA: DottedName, categoryB: DottedName) => {
        const valueA = getNumericValue(categoryA) ?? 0
        const valueB = getNumericValue(categoryB) ?? 0

        return valueB - valueA
      }
    )
  }, [everyUiCategoriesWithRepasAjusted, getNumericValue])

  return {
    sortedUiCategories,
  }
}
