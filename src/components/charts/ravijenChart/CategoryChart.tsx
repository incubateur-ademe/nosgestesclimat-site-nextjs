'use client'

import { DEFAULT_LIMIT_PERCENTAGE_TO_SQUASH } from '@/constants/ravijen'
import { useEngine } from '@/publicodes-state'
import SubcategoryChartBlock from './categoryChart/SubcategoryChartBlock'
import TotalCategoryBlock from './categoryChart/TotalCategoryBlock'

type Props = {
  category: string
  subcategories: string[]
  maxValue: number
  squashLimitPercentage?: number
  isInverted?: boolean
  shouldAlwaysDisplayValue?: boolean
}

export default function CategoryChart({
  category,
  subcategories,
  maxValue,
  squashLimitPercentage,
  isInverted = false,
  shouldAlwaysDisplayValue,
}: Props) {
  const { getNumericValue, checkIfValid } = useEngine()

  let sumSquashedSubcategoriesPercentage = 0

  const sortedSubcategories = subcategories
    ?.filter((subcategory: string) => checkIfValid(subcategory))
    // Get the value to display in the EnigmaticMoreChartBlock
    .map((subcategory) => {
      const categoryValue = getNumericValue(category) ?? 0

      const subcategoryValue = getNumericValue(subcategory) ?? 0

      const subcategoryPercentage = (subcategoryValue / categoryValue) * 100

      if (
        subcategoryPercentage <
        (squashLimitPercentage ?? DEFAULT_LIMIT_PERCENTAGE_TO_SQUASH)
      ) {
        sumSquashedSubcategoriesPercentage += subcategoryPercentage
      }
      return subcategory
    })
    .sort((categoryA: string, categoryB: string) => {
      const valueA = getNumericValue(categoryA) ?? 0
      const valueB = getNumericValue(categoryB) ?? 0

      return valueA - valueB
    })

  return (
    <div
      className={`flex h-full ${
        isInverted ? 'flex-col-reverse' : 'flex-col'
      } justify-end gap-[4px]`}>
      <div
        className={`flex h-[calc(100%-7rem)] ${
          isInverted ? 'flex-col-reverse' : 'flex-col'
        } justify-end gap-[1px]`}>
        {sortedSubcategories?.map((subcategory: string, index: number) => {
          return (
            <SubcategoryChartBlock
              key={subcategory}
              category={category}
              subcategory={subcategory}
              maxValue={maxValue}
              index={index}
              squashLimitPercentage={squashLimitPercentage}
              sumSquashedSubcategoriesPercentage={
                sumSquashedSubcategoriesPercentage
              }
              shouldAlwaysDisplayValue={shouldAlwaysDisplayValue}
            />
          )
        })}
      </div>

      <TotalCategoryBlock category={category} />
    </div>
  )
}
