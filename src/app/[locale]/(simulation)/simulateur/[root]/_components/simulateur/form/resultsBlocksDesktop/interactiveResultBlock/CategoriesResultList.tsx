import { useOrderedCategoryFromABTest } from '@/hooks/abTesting/useOrderedCategoryFromABTest'
import type { Metrics } from '@incubateur-ademe/nosgestesclimat'
import CategoryResult from './categoriesResultList/CategoryResult'

export default function CategoriesResultList({ metric }: { metric: Metrics }) {
  const orderedCategories = useOrderedCategoryFromABTest()
  return (
    <div className="flex flex-col pb-2">
      {orderedCategories.map((category) => (
        <CategoryResult key={category} category={category} metric={metric} />
      ))}
    </div>
  )
}
