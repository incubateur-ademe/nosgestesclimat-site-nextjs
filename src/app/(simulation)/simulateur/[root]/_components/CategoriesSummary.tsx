import { useSimulation } from '@/publicodes-state'
import Category from './categoriesSummary/Category'

export default function CategoriesSummary() {
  const { categories } = useSimulation()
  return (
    <div className="flex flex-col gap-2">
      {categories.map((category) => (
        <Category key={category} category={category} />
      ))}
    </div>
  )
}
