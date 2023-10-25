'use client'

import Card from '@/design-system/layout/Card'
import { useEngine, useForm, useRule } from '@/publicodes-state'
import { useMemo } from 'react'
import CategoryChartItem from './categoriesChart/CategoryChartItem'

export default function CategoriesChart() {
  const { categories } = useForm()

  const { getNumericValue } = useEngine()

  const sortedCategories = useMemo(() => {
    return categories.sort((categoryA, categoryB) => {
      const valueA = getNumericValue(categoryA) ?? 0
      const valueB = getNumericValue(categoryB) ?? 0

      return valueB - valueA
    })
  }, [categories, getNumericValue])

  const { numericValue: firstCategoryValue } = useRule(sortedCategories[0])

  return (
    <Card className="mt-4 w-full rounded-lg border-none bg-grey-100 p-3 shadow-none md:mt-0">
      <ul className="flex items-end justify-between">
        {sortedCategories.map((category) => (
          <CategoryChartItem
            key={category}
            category={category}
            maxValue={firstCategoryValue}
          />
        ))}
      </ul>
    </Card>
  )
}
