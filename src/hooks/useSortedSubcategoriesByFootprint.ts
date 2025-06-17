import { useEngine } from '@/publicodes-state'
import type { Metric } from '@/publicodes-state/types'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { useMemo } from 'react'

type Props = {
  metric?: Metric
  withServiceSocietaux?: boolean
}
export function useSortedSubcategoriesByFootprint({
  metric,
  withServiceSocietaux,
}: Props = {}) {
  const { getNumericValue, subcategories } = useEngine({ metric })

  const everySubcategories = useMemo(
    () =>
      withServiceSocietaux
        ? subcategories
        : subcategories.filter(
            (subcat) => !subcat.includes('services sociétaux')
          ),

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
