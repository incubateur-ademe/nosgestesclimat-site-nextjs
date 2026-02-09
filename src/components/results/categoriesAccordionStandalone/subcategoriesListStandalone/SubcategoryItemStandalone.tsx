import { carboneMetric } from '@/constants/model/metric'
import { formatFootprint } from '@/helpers/formatters/formatFootprint'
import type { Metric } from '@/publicodes-state/types'
import { capitalizeString } from '@/utils/capitalizeString'
import type { DottedName, NGCRules } from '@incubateur-ademe/nosgestesclimat'
import { utils } from 'publicodes'
import AnimatedBar from '../_client/AnimatedBar'

interface Props {
  subcategory: DottedName
  rules: Partial<NGCRules>
  value: number
  categoryValue: number
  colorName: string
  metric?: Metric
  index?: number
}

/**
 * Standalone version of SubcategoryListItem that doesn't use publicodes-state hooks.
 * Layout matches the Figma mockup: title + value + percentage, with animated bar below.
 */
export default function SubcategoryItemStandalone({
  subcategory,
  rules,
  value,
  categoryValue,
  colorName,
  metric = carboneMetric,
  index = 0,
}: Props) {
  const rule = rules[subcategory]
  const title = (rule?.titre as string) ?? utils.nameLeaf(subcategory)

  const { formattedValue, unit } = formatFootprint(value, { metric })

  if (formattedValue === '0') return null

  const percentageOfCategoryValue = Math.round((value / categoryValue) * 100)
  const barPercentage = (value / categoryValue) * 100

  // Calculate delay for staggered animation
  const animationDelay = 0.3 + index * 0.25

  return (
    <li className="py-3 first:pt-0 last:pb-0">
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline gap-2">
          <strong>{capitalizeString(title)}</strong>
          <span>
            {formattedValue} {unit} - {percentageOfCategoryValue}%
          </span>
        </div>

        <div
          className="w-full overflow-hidden"
          style={{ height: 6 }}
          role="img"
          aria-label={`Part de la sous-catégorie: ${percentageOfCategoryValue}%`}>
          <AnimatedBar
            percentage={barPercentage}
            delay={animationDelay}
            color={`bg-${colorName}-800`}
            height={6}
          />
        </div>
      </div>
    </li>
  )
}
