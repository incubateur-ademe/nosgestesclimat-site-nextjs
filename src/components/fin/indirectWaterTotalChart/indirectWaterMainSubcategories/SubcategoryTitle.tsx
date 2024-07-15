import Emoji from '@/design-system/utils/Emoji'
import {
  getBorderColor,
  getTextDarkColor,
} from '@/helpers/getCategoryColorClass'
import { useRule } from '@/publicodes-state'
import { DottedName } from '@/publicodes-state/types'
import { twMerge } from 'tailwind-merge'

type Props = {
  index: number
  subcategory: DottedName
  total: number
  totalOfFilteredSubcategories: number
}

export default function SubcategoryTitle({
  index,
  subcategory,
  total,
  totalOfFilteredSubcategories,
}: Props) {
  const { title, icons, numericValue, category } = useRule(subcategory, 'eau')

  const percentage = (numericValue / total) * 100

  // We add some height to the first one to make up for the droplet shape
  let heightEnhancement = 0
  if (index === 0) {
    const percentageDifference = Math.abs(
      (totalOfFilteredSubcategories / total) * 100 - 100
    )
    heightEnhancement = percentageDifference / 3
  }

  return (
    <div
      style={{ height: percentage + heightEnhancement + '%' }}
      className={twMerge(
        'flex items-end justify-end border-b-2 pb-1 font-medium',
        getBorderColor(category),
        getTextDarkColor(category),
        percentage > 15 ? 'text-2xl' : 'text-lg'
      )}>
      <span className="flex items-center gap-2">
        <span>
          <Emoji>{icons}</Emoji>
        </span>
        {title}
      </span>
    </div>
  )
}
