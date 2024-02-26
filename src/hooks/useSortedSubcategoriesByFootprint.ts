import { useEngine, useSimulation } from '@/publicodes-state'
import { DottedName } from '@/publicodes-state/types'
import { useMemo } from 'react'

export function useSortedSubcategoriesByFootprint() {
  const { subcategories } = useSimulation()
  const { getNumericValue } = useEngine()

  console.log(subcategories)

  const everySubcategories = Object.keys(subcategories).reduce(
    (acc, category) => {
      return acc.concat(subcategories[category])
    },
    [] as DottedName[]
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
