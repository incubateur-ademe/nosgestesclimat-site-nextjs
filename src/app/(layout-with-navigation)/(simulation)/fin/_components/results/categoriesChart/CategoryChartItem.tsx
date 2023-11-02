'use client'

import Badge from '@/design-system/layout/Badge'
import BarChart from '@/design-system/utils/BarChart'
import Emoji from '@/design-system/utils/Emoji'
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
    <li
      className="flex flex-col items-center justify-end gap-2"
      aria-label={t(
        'La catégorie {{title}} représente {{formattedValue}} tonnes de CO2 equivalent.',
        { formattedValue, title }
      )}>
      <Badge>
        <strong>{formattedValue}</strong> t
      </Badge>
      <div
        className="flex items-end"
        style={{ height: `calc(${percentageOfMaxValue} * 4rem)` }}>
        <BarChart
          type="vertical"
          percentage={percentageOfMaxValue}
          maxWidth="4rem"
          index={index}
        />
      </div>

      <Emoji className="mt-3 text-2xl" title={title}>
        {icons}
      </Emoji>
    </li>
  )
}
