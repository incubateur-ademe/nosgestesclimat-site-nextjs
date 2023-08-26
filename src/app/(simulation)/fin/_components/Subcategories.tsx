'use client'
import { useEngine, useForm } from '@/publicodes-state'
import { useMemo } from 'react'

import Subcategory from '@/components/misc/Subcategory'

type categoryObject = {
  dottedName: string
  value: number
}

export default function Subcategories() {
  const { subcategories } = useForm()
  const { getValue } = useEngine()
  const sortedSubcategories = useMemo(
    () =>
      Object.keys(subcategories)
        .reduce(
          (accumulator: any, currentValue: any) => [
            ...accumulator,
            ...subcategories[currentValue],
          ],
          []
        )
        .map((subcategory: string) => ({
          dottedName: subcategory,
          value: getValue(subcategory),
        }))
        .filter((subcategory: categoryObject) => subcategory.value)
        .sort((a: categoryObject, b: categoryObject) =>
          a.value > b.value ? -1 : 1
        ),
    [subcategories, getValue]
  )
  console.log(sortedSubcategories)
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
