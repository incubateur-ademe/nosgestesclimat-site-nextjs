import { useEngine, useForm } from '@/publicodes-state'
import { useMemo, useState } from 'react'
import { Flipped, Flipper } from 'react-flip-toolkit'

import Category from './barChart/Category'

export default function BarChart() {
  const { categories, currentCategory } = useForm()

  const { getNumericValue } = useEngine()

  const [isOpen, setIsOpen] = useState(null)

  const sortedCategories = useMemo(
    () =>
      categories.sort((a: string, b: string) => {
        const valueOfA =
          getNumericValue(
            a === 'transport' ? 'transport . empreinte' : a // Model shenanigans (we have to do this to deal with the idiotic "transport . empreinte" exception)
          ) || 0
        const valueOfB =
          getNumericValue(b === 'transport' ? 'transport . empreinte' : b) || 0
        return valueOfA > valueOfB ? -1 : 1
      }),
    [categories, getNumericValue]
  )

  const max = useMemo(() => {
    const maxValue = getNumericValue(sortedCategories[0]) || 0
    return maxValue > 5000 ? maxValue : 5000
  }, [sortedCategories, getNumericValue])

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
