import { useEngine, useRule } from '@/publicodes-state'
import { useSortedSubcategoriesByFootprint } from './useSortedSubcategoriesByFootprint'

export const useEndPageSharedUrl = () => {
  const { numericValue } = useRule('bilan')

  const { getNumericValue } = useEngine()

  const { sortedSubcategories } = useSortedSubcategoriesByFootprint()

  const firstThreeSubcategories = sortedSubcategories.slice(0, 3)

  const subcategories = firstThreeSubcategories.map((subcategory) => ({
    dottedName: encodeURIComponent(subcategory),
    value: Math.round(getNumericValue(subcategory)),
  }))

  const params = `?total=${Math.round(numericValue)}&c1name=${subcategories[0].dottedName}&c1value=${subcategories[0].value}&c2name=${subcategories[1].dottedName}&c2value=${subcategories[1].value}&c3name=${subcategories[2].dottedName}&c3value=${subcategories[2].value}`

  const sharedUrl = `${window.location.origin}/partage${params}`

  return { sharedUrl }
}
