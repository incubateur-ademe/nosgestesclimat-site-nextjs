import { useEngine, useForm, useRule } from '@/publicodes-state'
import SubcategoryListItem from './subcategoriesList/SubcategoryListItem'

export default function SubcategoriesList({ category }: { category: string }) {
  const { getNumericValue, checkIfValid } = useEngine()

  const { subcategories } = useForm()

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
