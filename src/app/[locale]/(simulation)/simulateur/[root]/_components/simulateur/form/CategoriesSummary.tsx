import { useEngine } from '@/publicodes-state'
import Category from './categoriesSummary/Category'

export default function CategoriesSummary() {
  const { categories } = useEngine()
  return (
    <div className="hidden flex-col gap-2 lg:flex">
      {categories.map((category) => (
        <Category key={category} category={category} />
      ))}
    </div>
  )
}
