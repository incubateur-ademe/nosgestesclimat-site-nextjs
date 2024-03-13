import { useEngine, useRule } from '@/publicodes-state'
import { DottedName } from '@/publicodes-state/types'
import SubcategoryListItem from './subcategoriesList/SubcategoryListItem'

export default function SubcategoriesList({
  category,
  subcategories,
}: {
  category: DottedName
  subcategories: Record<DottedName, DottedName[]>
}) {
  const { getNumericValue, checkIfValid } = useEngine()

  const sortedSubcategories = subcategories[category]
    ?.filter((subcategory: string) => checkIfValid(subcategory))
    .sort((categoryA: string, categoryB: string) => {
      const valueA = getNumericValue(categoryA) ?? 0
      const valueB = getNumericValue(categoryB) ?? 0

      return valueB - valueA
    })

  const { numericValue: categoryValue } = useRule(category)

  return (
    <ul>
      {sortedSubcategories.map((name: string) => (
        <SubcategoryListItem
          key={name}
          subcategory={name}
          categoryValue={categoryValue}
        />
      ))}
    </ul>
  )
}
