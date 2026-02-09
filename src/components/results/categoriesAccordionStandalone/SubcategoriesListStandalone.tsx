import { carboneMetric } from '@/constants/model/metric'
import type { Metric } from '@/publicodes-state/types'
import type { DottedName, NGCRules } from '@incubateur-ademe/nosgestesclimat'
import SubcategoryItemStandalone from './subcategoriesListStandalone/SubcategoryItemStandalone'

interface Props {
  category: DottedName
  colorName: string
  rules: Partial<NGCRules>
  subcategoriesData?: Record<DottedName, number>
  categoryValue: number
  metric?: Metric
}

/**
 * Standalone version of SubcategoriesList that doesn't use publicodes-state hooks.
 */
export default function SubcategoriesListStandalone({
  category,
  colorName,
  rules,
  subcategoriesData,
  categoryValue,
  metric = carboneMetric,
}: Props) {
  if (!subcategoriesData) {
    return null
  }

  // Filter subcategories that belong to this category and have valid values
  const filteredSubcategories = Object.entries(subcategoriesData)
    .filter(([dottedName, value]) => {
      // Check if this subcategory belongs to the current category
      const belongsToCategory = dottedName.startsWith(category)
      // Check if the rule exists
      const ruleExists = Boolean(rules[dottedName as DottedName])
      // Check if value is positive
      const hasValue = value > 0

      return belongsToCategory && ruleExists && hasValue
    })
    .sort(([, a], [, b]) => b - a)
    .map(([dottedName]) => dottedName as DottedName)

  return (
    <ul>
      {filteredSubcategories.map((subcategory, index) => (
        <SubcategoryItemStandalone
          key={subcategory}
          subcategory={subcategory}
          rules={rules}
          value={subcategoriesData[subcategory] ?? 0}
          categoryValue={categoryValue}
          colorName={colorName}
          metric={metric}
          index={index}
        />
      ))}
    </ul>
  )
}
