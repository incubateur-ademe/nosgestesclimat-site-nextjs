import { defaultMetric } from '@/constants/metric'
import { useEngine, useRule } from '@/publicodes-state'
import { DottedName, Metric } from '@/publicodes-state/types'
import SubcategoryListItem from './subcategoriesList/SubcategoryListItem'

type Props = {
  category: DottedName
  subcategories: Record<DottedName, DottedName[]>
  metric?: Metric
}
export default function SubcategoriesList({
  category,
  subcategories,
  metric = defaultMetric,
}: Props) {
  const { getNumericValue, checkIfValid } = useEngine({ metric })

  const sortedSubcategories = subcategories[category]
    ?.filter((subcategory) => checkIfValid(subcategory))
    .sort((categoryA, categoryB) => {
      const valueA = getNumericValue(categoryA) ?? 0
      const valueB = getNumericValue(categoryB) ?? 0

      return valueB - valueA
    })

  const { numericValue: categoryValue } = useRule(category, metric)

  return (
    <ul>
      {sortedSubcategories.map((name) => (
        <SubcategoryListItem
          key={name}
          subcategory={name}
          categoryValue={categoryValue}
          metric={metric}
        />
      ))}
    </ul>
  )
}
