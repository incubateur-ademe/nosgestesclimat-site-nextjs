import { useSimulation } from '@/publicodes-state'
import Category from './categoriesSummary/Category'

export default function CategoriesSummary() {
  const { categories } = useSimulation()
  return (
    <div className="-m-4 mt-0">
      {categories.map((category) => (
        <Category key={category} category={category} />
      ))}
    </div>
  )
}
