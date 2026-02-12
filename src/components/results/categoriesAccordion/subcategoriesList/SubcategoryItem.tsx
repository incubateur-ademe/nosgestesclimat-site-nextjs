import type { SubcategoryDisplayData } from '@/helpers/getCategoriesDisplayData'
import { capitalizeString } from '@/utils/capitalizeString'
import AnimatedBar from '../_client/AnimatedBar'

interface Props {
  subcategory: SubcategoryDisplayData
  colorName: string
  index?: number
}

export default function SubcategoryItem({
  subcategory,
  colorName,
  index = 0,
}: Props) {
  const animationDelay = 0.3 + index * 0.25

  return (
    <li className="py-3 first:pt-0 last:pb-0">
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline gap-2">
          <strong>{capitalizeString(subcategory.title)}</strong>
          <span>
            {subcategory.formattedValue} {subcategory.unit} -{' '}
            {subcategory.displayPercentage}
          </span>
        </div>

        <div
          className="w-full overflow-hidden"
          style={{ height: 6 }}
          role="img"
          aria-label={`Part de la sous-catégorie: ${subcategory.displayPercentage}`}>
          <AnimatedBar
            percentage={subcategory.percentage}
            delay={animationDelay}
            color={`bg-${colorName}-800`}
            height={6}
          />
        </div>
      </div>
    </li>
  )
}
