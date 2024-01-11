'use client'

import Badge from '@/design-system/layout/Badge'
import BarChart from '@/design-system/utils/BarChart'
import Emoji from '@/design-system/utils/Emoji'

export default function VerticalBarChartItem({
  value,
  index,
  percentage,
  ariaLabel,
  title,
  icons,
}: {
  ariaLabel: string
  index: number
  percentage: number
  title: string
  value: number
  icons: React.ReactNode
}) {
  return (
    <li
      className="flex flex-col items-center justify-end gap-2"
      aria-label={ariaLabel}>
      <Badge>
        <strong>{value}</strong> t
      </Badge>
      <div
        className="flex items-end"
        style={{ height: `calc(${percentage} * 4rem)` }}>
        <BarChart
          type="vertical"
          percentage={percentage}
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
