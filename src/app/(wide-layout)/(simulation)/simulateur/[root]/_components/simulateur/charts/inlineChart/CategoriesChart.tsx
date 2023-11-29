import { useForm, useRule } from '@/publicodes-state'

import Category from './categoriesChart/Category'

export default function CategoriesChart() {
  const { categories, currentCategory } = useForm()

  const { numericValue: total } = useRule('bilan')

  return (
    <>
      <div className="flex h-8 md:h-12">
        {categories.map((category: string, index: number) => (
          <Category
            key={category}
            position={
              index === 0
                ? 'first'
                : index === categories.length - 1
                ? 'last'
                : 'middle'
            }
            category={category}
            current={currentCategory === category}
            total={total}
          />
        ))}
      </div>
    </>
  )
}
