'use client'
import { useEngine, useSimulation } from '@/publicodes-state'
import Filter from './categoryFilters/Filter'

type Props = {
  actions: any
}

export default function CategoryFilters({ actions }: Props) {
  const { categories } = useSimulation()
  const { getCategory } = useEngine()

  const countByCategory = actions.reduce((accumulator: any, action: any) => {
    const category = getCategory(action.dottedName)

    return !category
      ? accumulator
      : { ...accumulator, [category]: (accumulator[category] || 0) + 1 }
  }, {})

  return (
    <ul className="flex list-none flex-wrap justify-center gap-1 pl-0">
      {categories?.map((category) => {
        return (
          <Filter
            key={category}
            dottedName={category}
            countByCategory={countByCategory}
          />
        )
      })}
    </ul>
  )
}
