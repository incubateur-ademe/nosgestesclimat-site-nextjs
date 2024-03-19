'use client'

import Badge from '@/design-system/layout/Badge'
import BarChart from '@/design-system/utils/BarChart'
import Emoji from '@/design-system/utils/Emoji'
import { formatCarbonFootprint } from '@/helpers/formatCarbonFootprint'

export default function VerticalBarChartItem({
  value,
  index,
  percentage,
  ariaLabel,
  title,
  icons,
  ...props
}: {
  ariaLabel: string
  index: number
  percentage: number
  title: string
  value: string
  icons: React.ReactNode
}) {
  const { formattedValue, unit } = formatCarbonFootprint(
    parseFloat(value) * 1000,
    {
      maximumFractionDigits: 1,
      shouldUseAbbreviation: true,
    }
  )

  return (
    <li
      className="flex h-full flex-1 flex-col items-center justify-end gap-2"
      aria-label={ariaLabel}
      {...props}>
      <Badge className="text-xs">
        <strong>{formattedValue}</strong> {unit}
      </Badge>
      <div className="flex items-end">
        <BarChart
          type="vertical"
          value={`calc(${percentage} * 6rem)`}
          index={index}
        />
      </div>

      <Emoji className="mt-3 text-2xl" title={title}>
        {icons}
      </Emoji>
    </li>
  )
}
