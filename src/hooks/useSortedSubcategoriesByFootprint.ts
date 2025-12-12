import { useEngine } from '@/publicodes-state'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { useMemo } from 'react'

interface Props {
  withServiceSocietaux?: boolean
}
export function useSortedSubcategoriesByFootprint({
  withServiceSocietaux,
}: Props = {}) {
  const { getNumericValue, subcategories } = useEngine()

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
