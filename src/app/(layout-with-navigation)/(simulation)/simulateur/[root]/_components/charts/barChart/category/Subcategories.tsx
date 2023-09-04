import { useEngine, useForm } from '@/publicodes-state'
import { useMemo } from 'react'
import { Flipped, Flipper } from 'react-flip-toolkit'

import Subcategory from '@/components/misc/Subcategory'

type Props = {
  category: string
  max: number
}
type categoryObject = {
  dottedName: string
  value: number
}
export default function Subcategories({ category, max }: Props) {
  const { subcategories } = useForm()

  const { getValue, isValid } = useEngine()

  const sortedSubcategories = useMemo(
    () =>
      subcategories[category]
        .filter((subcategory: string) => isValid(subcategory))
        .map((subcategory: string) => ({
          dottedName: subcategory,
          value: getValue(subcategory),
        }))
        .sort((a: categoryObject, b: categoryObject) =>
          a.value > b.value ? -1 : 1
        ),
    [subcategories, category, getValue, isValid]
  )

  return (
    <Flipper
      flipKey={sortedSubcategories
        .map((subcategory: categoryObject) => subcategory.dottedName)
        .join()}>
      {sortedSubcategories.map((subcategory: categoryObject) => (
        <Flipped flipId={subcategory.dottedName} key={subcategory.dottedName}>
          <Subcategory subcategory={subcategory.dottedName} max={max} />
        </Flipped>
      ))}
    </Flipper>
  )
}
