import Trans from '@/components/translation/Trans'
import { defaultMetric } from '@/constants/metric'
import Emoji from '@/design-system/utils/Emoji'
import { formatFootprint } from '@/helpers/formatters/formatFootprint'
import { useRule } from '@/publicodes-state'
import { Metric } from '@/publicodes-state/types'
import { DottedName } from '@incubateur-ademe/nosgestesclimat'

type Props = {
  subcategory: DottedName
  categoryValue: number
  metric?: Metric
}

export default function SubcategoryListItem({
  subcategory,
  categoryValue,
  metric = defaultMetric,
}: Props) {
  const { numericValue, title, icons } = useRule(subcategory, metric)

  const { formattedValue, unit } = formatFootprint(numericValue, { metric })
  if (formattedValue === '0') return null

  const percentageOfCategoryValue =
    1 - (categoryValue - numericValue) / categoryValue

  return (
    <li className="p-3">
      <div className="flex items-baseline gap-4">
        {/* @bjlaa: flex w-4 is required here because of a bug of react-easy-emoji that creates a duplicate empty element */}
        <Emoji className="flex w-4">{icons}</Emoji>

        <div className="w-full">
          <div className="flex items-center justify-between text-sm md:text-base">
            <p className="mb-0">{title}</p>

            <div className="text-primary-700">
              <strong>{formattedValue}</strong> <Trans>{unit}</Trans>
            </div>
          </div>
          <div className="mt-2">
            <div>
              <div
                className="h-[6px] rounded-xl bg-primary-700"
                style={{
                  width: `calc(${percentageOfCategoryValue} * 100%)`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}
