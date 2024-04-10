'use client'

import Badge from '@/design-system/layout/Badge'
import BarChart from '@/design-system/utils/BarChart'
import Emoji from '@/design-system/utils/Emoji'
import { formatCarbonFootprint } from '@/helpers/formatCarbonFootprint'

type Props = {
  value: string
  index: number
  percentage: number
  ariaLabel: string
  title: string
  icons: React.ReactNode
  barColor: string
}

export default function VerticalBarChartItem({
  value,
  index,
  percentage,
  ariaLabel,
  title,
  icons,
  barColor,
  ...props
}: Props) {
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
          color={barColor}
        />
      </div>

      <Emoji className="mt-3 text-2xl" title={title}>
        {icons}
      </Emoji>
    </li>
  )
}
