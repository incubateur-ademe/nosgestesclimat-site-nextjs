import type { SubcategoryDisplayData } from '@/helpers/getCategoriesDisplayData'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { capitalizeString } from '@/utils/capitalizeString'
import AnimatedBar from '../_client/AnimatedBar'

interface Props {
  subcategory: SubcategoryDisplayData
  bgBarClassName: string
  index?: number
}

export default function SubcategoryItem({
  subcategory,
  bgBarClassName,
  index = 0,
}: Props) {
  const animationDelay = 0.3 + index * 0.25

  const { t } = useClientTranslation()

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
          className="h-1.5 w-full overflow-hidden"
          role="img"
          aria-label={t(`Part de la sous-catégorie {{percentage}}`, {
            percentage: subcategory.displayPercentage,
          })}>
          <AnimatedBar
            percentage={subcategory.percentage}
            delay={animationDelay}
            color={bgBarClassName}
            height={6}
          />
        </div>
      </div>
    </li>
  )
}
