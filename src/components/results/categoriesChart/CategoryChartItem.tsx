'use client'

import VerticalBarChartItem from '@/components/charts/verticalBarChart/VerticalBarChartItem'
import { getBackgroundColor } from '@/helpers/getCategoryColorClass'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useRule } from '@/publicodes-state'
import { formatValue } from 'publicodes'

export default function CategoryChartItem({
  category,
  maxValue,
  index,
}: {
  category: string
  maxValue: number
  index: number
}) {
  const { t } = useClientTranslation()

  const { numericValue, icons, title } = useRule(category)

  const percentageOfMaxValue = 1 - (maxValue - numericValue) / maxValue

  const formattedValue = formatValue(numericValue / 1000, { precision: 1 })

  return (
    <VerticalBarChartItem
      value={formattedValue}
      index={index}
      percentage={percentageOfMaxValue}
      ariaLabel={t(
        'La catégorie {{title}} représente {{formattedValue}} tonnes de CO2 equivalent.',
        { formattedValue, title }
      )}
      barColor={getBackgroundColor(category)}
      title={title ?? ''}
      icons={icons}
    />
  )
}
