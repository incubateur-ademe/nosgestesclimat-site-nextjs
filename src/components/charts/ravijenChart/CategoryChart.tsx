'use client'

import { LIMIT_PERCENTAGE_TO_SQUASH } from '@/constants/ravijen'
import { useEngine } from '@/publicodes-state'
import SubcategoryChartBlock from './categoryChart/SubcategoryChartBlock'
import TotalCategoryBlock from './categoryChart/TotalCategoryBlock'

type Props = {
  category: string
  subcategories: string[]
  maxValue: number
  squashPercentage?: number
}

export default function CategoryChart({
  category,
  subcategories,
  maxValue,
  squashPercentage,
}: Props) {
  const { getNumericValue, checkIfValid } = useEngine()

  let percentageSquashed = 0

  const sortedSubcategories = subcategories
    ?.filter((subcategory: string) => checkIfValid(subcategory))
    // Get the value to display in the EnigmaticMoreChartBlock
    .map((subcategory) => {
      const categoryValue = getNumericValue(category) ?? 0

      const subcategoryValue = getNumericValue(subcategory) ?? 0

      const subcategoryPercentage = (subcategoryValue / categoryValue) * 100

      if (
        subcategoryPercentage < (squashPercentage ?? LIMIT_PERCENTAGE_TO_SQUASH)
      ) {
        percentageSquashed += subcategoryPercentage
      }
      return subcategory
    })
    .sort((categoryA: string, categoryB: string) => {
      const valueA = getNumericValue(categoryA) ?? 0
      const valueB = getNumericValue(categoryB) ?? 0

      return valueA - valueB
    })

  return (
    <div className="flex h-full flex-col justify-end gap-[1px]">
      <div className="flex h-[calc(100%-7rem)] flex-col justify-end gap-[1px]">
        {sortedSubcategories?.map((subcategory: string, index: number) => {
          return (
            <SubcategoryChartBlock
              key={subcategory}
              category={category}
              subcategory={subcategory}
              maxValue={maxValue}
              index={index}
              percentageSquashed={percentageSquashed}
            />
          )
        })}
      </div>

      <TotalCategoryBlock category={category} />
    </div>
  )
}
