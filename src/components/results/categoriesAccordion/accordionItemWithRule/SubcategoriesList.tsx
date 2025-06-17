import { defaultMetric } from '@/constants/model/metric'
import { useEngine, useRule } from '@/publicodes-state'
import type { Metric } from '@/publicodes-state/types'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import SubcategoryListItem from './subcategoriesList/SubcategoryListItem'

type Props = {
  category: DottedName
  subcategories: DottedName[]
  metric?: Metric
}
export default function SubcategoriesList({
  category,
  subcategories,
  metric = defaultMetric,
}: Props) {
  const { getNumericValue, checkIfValid } = useEngine({ metric })

  const sortedSubcategories = subcategories
    ?.filter(
      (subcategory) =>
        subcategory?.startsWith(category) && checkIfValid(subcategory)
    )
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
