'use client'

import { orderedCategories } from '@/constants/orderedCategories'
import { useEngine } from '@/publicodes-state'
import CategoryChart from './ravijenChart/CategoryChart'

export default function RavijenChart() {
  const { getNumericValue } = useEngine()

  const worstFootprintCategoryValue = orderedCategories
    .map((category) => ({
      category,
      value: getNumericValue(category) ?? 0,
    }))
    .sort((a, b) => b.value - a.value)[0]?.value

  return (
    <ul className="flex h-[40rem] w-[36rem] max-w-full items-end gap-1">
      {orderedCategories.map((category) => (
        <li key={category} className="h-full flex-1">
          <CategoryChart
            category={category}
            maxValue={worstFootprintCategoryValue}
          />
        </li>
      ))}
    </ul>
  )
}
