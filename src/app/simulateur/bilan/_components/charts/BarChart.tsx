import { useEngine, useForm } from '@/publicodes-state'
import { useMemo } from 'react'
import { Flipped, Flipper } from 'react-flip-toolkit'

import Category from './barChart/Category'

type categoryObject = {
  dottedName: string
  value: number
}
export default function BarChart() {
  const { categories } = useForm()

  const { getValue } = useEngine()

  const sortedCategories = useMemo(
    () =>
      categories
        .map((category: string) => ({
          dottedName: category,
          value: getValue(
            category === 'transport' ? 'transport . empreinte' : category
          ),
        }))
        .sort((a: categoryObject, b: categoryObject) =>
          a.value > b.value ? -1 : 1
        ),
    [categories, getValue]
  )

  return (
    <Flipper
      flipKey={sortedCategories
        .map((category: categoryObject) => category.dottedName)
        .join()}>
      {sortedCategories.map((category: categoryObject) => (
        <Flipped flipId={category.dottedName} key={category.dottedName}>
          <Category
            category={category.dottedName}
            value={category.value} // FFS (we have to do this to deal with the idiotic "transport . empreinte" exception)
            max={sortedCategories[0].value}
          />
        </Flipped>
      ))}
    </Flipper>
  )
}
