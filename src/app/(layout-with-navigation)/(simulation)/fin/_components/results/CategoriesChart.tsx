'use client'

import VerticalBarChart from '@/components/charts/VerticalBarChart'
import { useRule } from '@/publicodes-state'
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
    <VerticalBarChart className={className}>
      {sortedCategories.map((category, index) => (
        <CategoryChartItem
          key={category}
          category={category}
          maxValue={firstCategoryValue}
          index={index}
        />
      ))}
    </VerticalBarChart>
  )
}
