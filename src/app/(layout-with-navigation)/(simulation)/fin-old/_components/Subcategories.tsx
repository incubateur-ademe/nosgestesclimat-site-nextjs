'use client'

import Subcategory from '@/components/misc/Subcategory'
import { useEngine, useForm } from '@/publicodes-state'
import { useMemo } from 'react'

type categoryObject = {
  dottedName: string
  value: number
}

export default function Subcategories() {
  const { subcategories } = useForm()
  const { getNumericValue } = useEngine()
  const sortedSubcategories = useMemo(
    () =>
      Object.keys(subcategories)
        .reduce(
          (accumulator: string[], currentValue: string) => [
            ...accumulator,
            ...subcategories[currentValue],
          ],
          []
        )
        .map((subcategory: string) => ({
          dottedName: subcategory,
          value: getNumericValue(subcategory) || 0,
        }))
        .filter((subcategory: categoryObject) => subcategory.value)
        .sort((a: categoryObject, b: categoryObject) =>
          a.value > b.value ? -1 : 1
        ),
    [subcategories, getNumericValue]
  )
  return (
    <div>
      {sortedSubcategories.map((subCategory) => (
        <Subcategory
          key={subCategory.dottedName}
          subcategory={subCategory.dottedName}
          max={sortedSubcategories[0].value}
        />
      ))}
    </div>
  )
}
