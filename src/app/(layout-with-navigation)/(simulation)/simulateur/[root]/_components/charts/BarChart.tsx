import { useEngine, useForm } from '@/publicodes-state'
import { useMemo, useState } from 'react'
import { Flipped, Flipper } from 'react-flip-toolkit'

import Category from './barChart/Category'

export default function BarChart() {
  const { categories, currentCategory } = useForm()

  const { getValue } = useEngine()

  const [isOpen, setIsOpen] = useState(null)

  const sortedCategories = useMemo(
    () =>
      categories.sort((a: string, b: string) =>
        getValue(
          a === 'transport' ? 'transport . empreinte' : a // Model shenanigans (we have to do this to deal with the idiotic "transport . empreinte" exception)
        ) > getValue(b === 'transport' ? 'transport . empreinte' : b)
          ? -1
          : 1
      ),
    [categories, getValue]
  )

  const max =
    sortedCategories[0]?.value > 5000 ? sortedCategories[0]?.value : 5000

  return (
    <Flipper
      flipKey={sortedCategories.map((category: string) => category).join('')}>
      {sortedCategories.map((category: string) => (
        <Flipped flipId={category} key={category}>
          <Category
            category={category}
            current={category === currentCategory}
            isOpen={category === isOpen}
            setIsOpen={setIsOpen}
            max={max}
          />
        </Flipped>
      ))}
    </Flipper>
  )
}
