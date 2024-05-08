import BarChart from '@/design-system/utils/BarChart'
import Emoji from '@/design-system/utils/Emoji'
import { ReactNode } from 'react'

type Props = {
  title?: string
  icons?: string
  displayValue: ReactNode
  percentageOfTotalValue: number
  minTitleWidth?: number
  index?: number
  barColor?: string
}

export default function HorizontalBarChartItem({
  title,
  icons,
  displayValue,
  percentageOfTotalValue,
  minTitleWidth,
  index,
  barColor,
}: Props) {
  return (
    <div className="flex w-full items-center justify-between gap-2">
      <div
        className="hidden items-center gap-2 text-sm md:flex"
        style={{
          minWidth: (minTitleWidth ?? 10) + 'rem',
        }}>
        <Emoji>{icons}</Emoji>{' '}
        <p className={`mb-0 underline decoration-dotted underline-offset-4`}>
          {title}
        </p>
      </div>

      <div className="flex items-center gap-2 md:hidden">
        <Emoji>{icons}</Emoji>{' '}
        <p
          className={`mb-0 text-sm underline decoration-dotted underline-offset-4`}>
          {(title?.length ?? 0) > 14 ? title?.split(' ')[0] : title}
        </p>
      </div>

      <div className="mr-4 hidden flex-1 md:block">
        <BarChart
          type="horizontal"
          value={`${percentageOfTotalValue}%`}
          index={index}
          color={barColor}
        />
      </div>

      <div className="mr-4 min-w-20 text-right text-sm text-primary-700">
        {displayValue}
      </div>
    </div>
  )
}
