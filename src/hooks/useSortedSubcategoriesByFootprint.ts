import { useEngine, useSimulation } from '@/publicodes-state'
import { Metric } from '@/publicodes-state/types'
import { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { useMemo } from 'react'

type Props = {
  metric?: Metric
  withServiceSocietaux?: boolean
}
export function useSortedSubcategoriesByFootprint({
  metric,
  withServiceSocietaux,
}: Props = {}) {
  const { subcategories } = useSimulation()
  const { getNumericValue } = useEngine({ metric })

  const everySubcategories = useMemo(
    () =>
      Object.keys(subcategories).reduce((acc, category) => {
        if (!withServiceSocietaux && category === 'services sociétaux') {
          return acc
        }
        return acc.concat(subcategories[category as DottedName])
      }, [] as DottedName[]),
    [subcategories, withServiceSocietaux]
  )

  const sortedSubcategories = useMemo(() => {
    return everySubcategories.sort(
      (categoryA: DottedName, categoryB: DottedName) => {
        const valueA = getNumericValue(categoryA) ?? 0
        const valueB = getNumericValue(categoryB) ?? 0

        return valueB - valueA
      }
    )
  }, [everySubcategories, getNumericValue])

  return {
    sortedSubcategories,
  }
}
