import { useEngine, useForm } from '@/publicodes-state'
import { useMemo } from 'react'
import { Flipped, Flipper } from 'react-flip-toolkit'

import Subcategory from './subcategories/SubCategory'

type Props = {
  category: string
  max: number
  color: string
}
type categoryObject = {
  dottedName: string
  value: number
}
export default function Subcategories({ category, max, color }: Props) {
  const { subcategories } = useForm()

  const { getValue } = useEngine()

  const sortedSubcategories = useMemo(
    () =>
      subcategories[category]
        .map((subcategory: string) => ({
          dottedName: subcategory,
          value: getValue(subcategory),
        }))
        .sort((a: categoryObject, b: categoryObject) =>
          a.value > b.value ? -1 : 1
        ),
    [subcategories, category, getValue]
  )

  return (
    <Flipper
      flipKey={sortedSubcategories
        .map((subcategory: categoryObject) => subcategory.dottedName)
        .join()}>
      {sortedSubcategories.map((subcategory: categoryObject) => (
        <Flipped flipId={subcategory.dottedName} key={subcategory.dottedName}>
          <Subcategory
            category={subcategory.dottedName}
            max={max}
            color={color}
          />
        </Flipped>
      ))}
    </Flipper>
  )
}
