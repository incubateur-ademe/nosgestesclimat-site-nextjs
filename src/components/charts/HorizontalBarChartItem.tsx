import BarChart from '@/design-system/utils/BarChart'
import type { ReactNode } from 'react'

interface Props {
  title?: string | ReactNode
  icon?: ReactNode
  displayValue?: ReactNode
  shouldDisplayValue?: boolean
  percentageOfTotalValue: number
  minTitleWidth?: number
  index?: number
  color?: string
}

export default function HorizontalBarChartItem({
  title,
  icon,
  displayValue,
  shouldDisplayValue = true,
  percentageOfTotalValue,
  minTitleWidth,
  index,
  color,
}: Props) {
  return (
    <div className="w-full rounded-lg border border-slate-400 bg-white p-4 pr-12">
      <div
        className="mb-1.5 flex justify-between"
        style={{
          minWidth: (minTitleWidth ?? 10) + 'rem',
        }}>
        <div className="flex items-center gap-2">
          <span className={`rounded-sm p-1.5 bg-${color}-100`}>{icon}</span>{' '}
          <p className={`mb-0`}>{title}</p>
        </div>
        {shouldDisplayValue && displayValue && (
          <div className="text-primary-700 mr-4 min-w-20 text-right">
            {displayValue}
          </div>
        )}
      </div>

      <div className="mr-4 flex-1" aria-hidden>
        <BarChart
          type="horizontal"
          className="h-2"
          value={`${percentageOfTotalValue}%`}
          index={index}
          color={`bg-${color}-800`}
        />
      </div>
    </div>
  )
}
