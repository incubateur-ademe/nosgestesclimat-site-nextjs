'use client'

import TransClient from '@/components/translation/TransClient'
import { useEngine, useForm, useRule } from '@/publicodes-state'
import { useMemo } from 'react'
import Block from './gridChart/Block'

export default function GridChart() {
  const { value: total } = useRule('bilan')

  const numberOfSquares = 100
  const valueOfEachSquare = total / numberOfSquares
  console.log(valueOfEachSquare)
  const { subcategories } = useForm()

  const { getValue, checkIfValid } = useEngine()
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
        .filter((subcategory: any) => checkIfValid(subcategory))
        .map((subcategory: string) => ({
          dottedName: subcategory,
          squares: Math.round(getValue(subcategory) / valueOfEachSquare),
        }))
        .filter((subcategory: any) => subcategory.squares)

        .reduce(
          (accumulator: any[], currentValue: any) => [
            ...accumulator,
            // eslint-disable-next-line prefer-spread
            ...Array.apply(null, Array(currentValue.squares)).map(() => ({
              dottedName: currentValue.dottedName,
            })),
          ],
          []
        ),
    [subcategories, getValue, checkIfValid, valueOfEachSquare]
  )

  return (
    <div className="p-12 bg-primaryLight rounded-lg">
      <h3 className="text-center text-xl">
        <TransClient>De quoi est faite mon empreinte&nbsp;?</TransClient>
      </h3>
      <div className="grid grid-cols-10	gap-1">
        {sortedSubcategories.map((subCategory: any, index: number) =>
          index < 100 ? (
            <Block
              key={subCategory.dottedName + index}
              subcategory={subCategory.dottedName}
            />
          ) : null
        )}
      </div>
    </div>
  )
}
