import { useEngine, useSimulation } from '@/publicodes-state'
import SubcategoryChartBlock from './categoryChart/SubcategoryChartBlock'
import TotalCategoryBlock from './categoryChart/TotalCategoryBlock'

export default function CategoryChart({ category }: { category: string }) {
  const { getNumericValue, checkIfValid } = useEngine()
  const { subcategories } = useSimulation()

  const sortedSubcategories = subcategories[category]
    ?.filter((subcategory: string) => checkIfValid(subcategory))
    .sort((categoryA: string, categoryB: string) => {
      const valueA = getNumericValue(categoryA) ?? 0
      const valueB = getNumericValue(categoryB) ?? 0

      return valueA - valueB
    })

  return (
    <div className="flex flex-col gap-1">
      {sortedSubcategories?.map((subcategory: string) => {
        return (
          <SubcategoryChartBlock key={subcategory} subcategory={subcategory} />
        )
      })}

      <TotalCategoryBlock category={category} />
    </div>
  )
}
