import { eauMetric } from '@/constants/model/metric'
import { useEngine } from '@/publicodes-state'
import type { Metric } from '@/publicodes-state/types'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { useMemo } from 'react'

type Props = {
  metric?: Metric
}
export function useSortedUiCategoriesByFootprint({ metric }: Props = {}) {
  const { getNumericValue, everyUiCategories } = useEngine()

  // This is temporary until we decide if we want to show the repas categories in the water footprint
  const everyUiCategoriesWithRepasAjusted = useMemo(
    () =>
      metric === eauMetric
        ? ([
            ...everyUiCategories.filter(
              (category) =>
                !['viande', 'végé', 'poisson'].some((repasDottedName) =>
                  category.includes(repasDottedName)
                )
            ),
            'alimentation . déjeuner et dîner',
          ] as DottedName[])
        : everyUiCategories,
    [everyUiCategories, metric]
  )

  const sortedUiCategories = useMemo(() => {
    return everyUiCategoriesWithRepasAjusted.sort(
      (categoryA: DottedName, categoryB: DottedName) => {
        const valueA = getNumericValue(categoryA) ?? 0
        const valueB = getNumericValue(categoryB) ?? 0

        return valueB - valueA
      }
    ) as DottedName[]
  }, [everyUiCategoriesWithRepasAjusted, getNumericValue])

  return {
    sortedUiCategories,
  }
}
