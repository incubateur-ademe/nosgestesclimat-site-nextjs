import BarChart from '@/design-system/utils/BarChart'
import type { SubcategoryDisplayData } from '@/helpers/getCategoriesDisplayData'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import type { Locale } from '@/i18nConfig'
import { capitalizeString } from '@/utils/capitalizeString'

interface Props {
  subcategory: SubcategoryDisplayData
  bgBarClassName: string
  index?: number
  locale: Locale
}

export default async function SubcategoryItem({
  subcategory,
  bgBarClassName,
  index = 0,
  locale,
}: Props) {
  const { t } = await getServerTranslation({ locale })

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
          className="h-1.5 w-full overflow-hidden"
          role="img"
          aria-label={t(`Part de la sous-catégorie {{percentage}}`, {
            percentage: subcategory.displayPercentage,
          })}>
          <BarChart
            type="horizontal"
            value={`${subcategory.percentage}%`}
            delay={animationDelay}
            color={bgBarClassName}
            width={6}
          />
        </div>
      </div>
    </li>
  )
}
