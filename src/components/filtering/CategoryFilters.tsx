'use client'

import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import CategoryFilter from './categoryFilters/CategoryFilter'

type Props = {
  categories: {
    title: string
    dottedName: DottedName
    count: number
  }[]
}

export default function CategoryFilters({ categories }: Props) {
  return (
    <ul className="flex list-none flex-wrap justify-center gap-1 pl-0">
      {categories?.map(({ title, dottedName, count }) => {
        return (
          <CategoryFilter
            key={title}
            title={title}
            dottedName={dottedName}
            count={count}
          />
        )
      })}
    </ul>
  )
}
