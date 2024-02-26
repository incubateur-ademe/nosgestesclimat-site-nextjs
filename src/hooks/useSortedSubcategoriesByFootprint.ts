import { useEngine, useSimulation } from '@/publicodes-state'
import { DottedName } from '@/publicodes-state/types'
import { useMemo } from 'react'

type Props = {
  noServiceSocietaux: boolean
}
export function useSortedSubcategoriesByFootprint(
  { noServiceSocietaux }: Props = { noServiceSocietaux: true }
) {
  const { subcategories } = useSimulation()
  const { getNumericValue } = useEngine()

  const everySubcategories = useMemo(
    () =>
      Object.keys(subcategories).reduce((acc, category) => {
        if (noServiceSocietaux && category === 'services sociétaux') {
          return acc
        }
        return acc.concat(subcategories[category])
      }, [] as DottedName[]),
    [subcategories, noServiceSocietaux]
  )

  const sortedSubcategories = useMemo<DottedName[]>(() => {
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
