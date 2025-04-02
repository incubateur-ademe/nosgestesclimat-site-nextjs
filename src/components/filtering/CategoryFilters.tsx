'use client'

import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { twMerge } from 'tailwind-merge'
import CategoryFilter from './categoryFilters/CategoryFilter'

type Props = {
  categories: {
    title: string
    dottedName: DottedName
    count: number
  }[]
  className?: string
}

export default function CategoryFilters({ categories, className }: Props) {
  return (
    <ul
      className={twMerge(
        'flex list-none flex-wrap justify-start gap-1 pl-0',
        className
      )}>
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
