import { useForm } from '@/publicodes-state'
import Category from './debug/Category'

export default function Debug() {
  const { categories } = useForm()

  return (
    <div className="mb-4 rounded border border-primary p-4">
      Debug
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category: any) => (
          <Category key={category} category={category} />
        ))}
      </div>
    </div>
  )
}
