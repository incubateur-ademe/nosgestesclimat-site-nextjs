'use client'

import Trans from '@/components/translation/Trans'
import useWindowSize from '@/hooks/useWindowSize'
import { useEngine, useForm, useRule } from '@/publicodes-state'
import { useMemo } from 'react'
import Block from './gridChart/Block'

export default function GridChart() {
  const { numericValue: total } = useRule('bilan')

  const { width } = useWindowSize()
  const numberOfSquares = width < 768 ? 64 : 100
  const valueOfEachSquare = total / numberOfSquares
  const { subcategories } = useForm()

  const { getNumericValue, checkIfValid } = useEngine()
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
          squares: Math.round(getNumericValue(subcategory) / valueOfEachSquare),
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
    [subcategories, getNumericValue, checkIfValid, valueOfEachSquare]
  )

  return (
    <>
      <h3 className="mb-2 text-center text-lg md:mb-4 md:text-xl">
        <Trans>De quoi est faite mon empreinte&nbsp;?</Trans>
      </h3>
      <div className="grid grid-cols-8 gap-1	md:grid-cols-10">
        {sortedSubcategories.map((subCategory: any, index: number) =>
          index < numberOfSquares ? (
            <Block
              key={subCategory.dottedName + index}
              subcategory={subCategory.dottedName}
            />
          ) : null
        )}
      </div>
    </>
  )
}
