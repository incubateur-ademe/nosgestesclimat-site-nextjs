import { useForm } from '@/publicodes-state'
import Category from './debug/Category'

export default function Debug() {
  const { categories } = useForm()

  return (
    <div className="mb-4 rounded border border-white p-4">
      <div className="flex flex-wrap gap-4">
        {categories.map((category: any) => (
          <Category key={category} category={category} />
        ))}
      </div>
    </div>
  )
}
