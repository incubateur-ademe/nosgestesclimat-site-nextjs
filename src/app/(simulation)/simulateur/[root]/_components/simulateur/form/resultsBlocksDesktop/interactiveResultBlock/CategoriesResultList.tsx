import { orderedCategories } from '@/constants/orderedCategories'
import type { Metrics } from '@incubateur-ademe/nosgestesclimat'
import CategoryResult from './categoriesResultList/CategoryResult'

export default function CategoriesResultList({ metric }: { metric: Metrics }) {
  return (
    <div className="flex flex-col pb-1">
      {orderedCategories.map((category) => (
        <CategoryResult key={category} category={category} metric={metric} />
      ))}
    </div>
  )
}
