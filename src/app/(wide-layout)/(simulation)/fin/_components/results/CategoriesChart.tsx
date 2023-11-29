'use client'

import Card from '@/design-system/layout/Card'
import { useRule } from '@/publicodes-state'
import { twMerge } from 'tailwind-merge'
import CategoryChartItem from './categoriesChart/CategoryChartItem'

type Props = {
  sortedCategories: string[]
  className?: string
}
export default function CategoriesChart({
  sortedCategories,
  className,
}: Props) {
  const { numericValue: firstCategoryValue } = useRule(sortedCategories[0])

  return (
    <Card
      className={twMerge(
        'mt-4 h-[171px] w-full rounded-lg border-none bg-grey-100 p-3 shadow-none md:mt-0 md:hidden',
        className
      )}>
      <ul className="flex items-end justify-between">
        {sortedCategories.map((category, index) => (
          <CategoryChartItem
            key={category}
            category={category}
            maxValue={firstCategoryValue}
            index={index}
          />
        ))}
      </ul>
    </Card>
  )
}
