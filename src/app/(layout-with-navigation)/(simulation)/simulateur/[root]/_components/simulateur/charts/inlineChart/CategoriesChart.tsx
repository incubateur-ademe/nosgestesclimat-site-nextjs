import { useForm, useRule, useSimulation } from '@/publicodes-state'

import Category from './categoriesChart/Category'

export default function CategoriesChart() {
  const { currentCategory } = useForm()

  const { categories } = useSimulation()

  const { numericValue: total } = useRule('bilan')

  return (
    <>
      <div className="flex h-8 overflow-hidden rounded-md md:h-12 md:rounded-xl">
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
