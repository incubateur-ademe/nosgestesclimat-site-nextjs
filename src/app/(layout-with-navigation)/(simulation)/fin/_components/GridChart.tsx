'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import CopyButton from '@/design-system/inputs/CopyButton'
import { formatResultToDetailParam } from '@/helpers/url/formatResultToDetailParam'
import useWindowSize from '@/hooks/useWindowSize'
import { useEngine, useForm, useRule } from '@/publicodes-state'
import { useMemo } from 'react'
import Block from './gridChart/Block'
import ShareImage from './gridChart/ShareImage'

export default function GridChart() {
  const { numericValue: total } = useRule('bilan')

  const { width } = useWindowSize()
  const numberOfSquares = width < 768 ? 64 : 100
  const valueOfEachSquare = total / numberOfSquares
  const { subcategories, categories } = useForm()

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
        <Trans>De quoi est faite mon empreinte ?</Trans>
      </h3>
      <div className="grid grid-cols-8 gap-1	md:grid-cols-10" id="shareImage">
        {sortedSubcategories.map((subCategory: any, index: number) =>
          index < numberOfSquares ? (
            <Block
              key={subCategory.dottedName + index}
              subcategory={subCategory.dottedName}
            />
          ) : null
        )}
      </div>

      <div className="mt-4 flex flex-col items-center gap-4">
        <CopyButton
          className="items-start justify-center p-2 text-sm md:text-base"
          textToCopy={`https://nosgestesclimat.fr/fin?diapo=bilan&${formatResultToDetailParam(
            {
              categories,
              getValue: getNumericValue,
            }
          )}`}
          copiedStateText={
            <>
              <ShareImage />
              <Trans>Copié !</Trans>
            </>
          }>
          <ShareImage />
          <Trans>Partager mes résultats</Trans>
        </CopyButton>
        <Link href="/documentation/bilan">
          <Trans>Comprendre le calcul</Trans>
        </Link>
      </div>
    </>
  )
}
