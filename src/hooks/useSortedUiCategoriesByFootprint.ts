import { eauMetric } from '@/constants/metric'
import { useEngine, useSimulation } from '@/publicodes-state'
import { Metric } from '@/publicodes-state/types'
import { DottedName } from '@incubateur-ademe/nosgestesclimat'
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
