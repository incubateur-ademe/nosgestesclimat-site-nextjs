'use client'

import Link from '@/components/Link'
import SafeImage from '@/components/images/SafeImage'
import { LIMIT_PERCENTAGE_TO_SQUASH } from '@/constants/ravijen'
import formatCarbonFootprint from '@/helpers/formatCarbonFootprint'
import { useRule } from '@/publicodes-state'
import { capitaliseString } from '@/utils/capitaliseString'
import { removePercentageFromString } from '@/utils/removePercentageFromString'
import EnigmaticMoreChartBlock from './subcategoryChartBlock/EnigmaticMoreChartBlock'

type Props = {
  category: string
  subcategory: string
  maxValue: number
  index: number
  percentageSquashed: number
}

export default function SubcategoryChartBlock({
  subcategory,
  category,
  maxValue,
  index,
  percentageSquashed,
}: Props) {
  const { numericValue: categoryNumericvalue } = useRule(category)

  const subcategoryObject = useRule(subcategory)
  const { title, numericValue, color } = subcategoryObject

  const { formattedValue, unit } = formatCarbonFootprint(numericValue)

  // Here we compare the value of the current category to the value of the
  // category with the highest value. We then use this ratio to calculate the
  // height of the block, with all blocks on the same scale.
  const categoryRatio = 1 - (maxValue - categoryNumericvalue) / maxValue

  const heightPercentage =
    (numericValue / categoryNumericvalue) * (100 * categoryRatio)

  if (
    heightPercentage < (percentageSquashed ?? LIMIT_PERCENTAGE_TO_SQUASH) &&
    index !== 0
  )
    return null

  if (
    heightPercentage < (percentageSquashed ?? LIMIT_PERCENTAGE_TO_SQUASH) &&
    index === 0
  ) {
    return (
      <EnigmaticMoreChartBlock
        color={color ?? '#333'}
        percentageSquashed={percentageSquashed}
      />
    )
  }

  const isSmall = heightPercentage < 12

  const titleFormatted = capitaliseString(
    removePercentageFromString(title ?? '')
  )

  return (
    <Link
      title={`${titleFormatted}, ${formattedValue} ${unit}, voir la documentation`}
      href={`/documentation/${subcategory.replaceAll(' . ', '/')}`}
      className={`flex items-center !text-white !no-underline hover:!underline ${
        isSmall ? 'flex-row justify-center gap-1' : 'flex-col pt-2'
      }`}
      style={{
        backgroundColor: color ?? '#32337B',
        height: `${heightPercentage}%`,
      }}>
      <SafeImage
        style={{ filter: 'grayscale(1) invert(1) brightness(1.8)' }}
        src={`/images/model/${subcategory}.svg`}
        alt={`${titleFormatted}, ${formattedValue} ${unit}`}
        width={24}
        height={24}
        className="h-6 w-6"
      />

      <p className={`${isSmall ? 'mb-0' : 'mb-1'} text-center text-[0.65rem]`}>
        {titleFormatted}
      </p>

      {!isSmall && (
        <p className="mb-0 text-sm">
          <strong>
            {formattedValue} {unit}
          </strong>
        </p>
      )}
    </Link>
  )
}
