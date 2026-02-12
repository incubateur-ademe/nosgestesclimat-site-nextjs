import BarChart from '@/design-system/utils/BarChart'
import type { ReactNode } from 'react'

interface Props {
  title?: string | ReactNode
  icon?: ReactNode
  displayValue?: ReactNode
  percentageOfTotalValue: number
  minTitleWidth?: number
  index?: number
  bgBarClassName?: string
  bgIconClassName?: string
}

export default function HorizontalBarChartItem({
  title,
  icon,
  displayValue,
  percentageOfTotalValue,
  minTitleWidth,
  index,
  bgBarClassName = 'bg-primary-800',
  bgIconClassName = 'bg-primary-100',
}: Props) {
  return (
    <div className="w-full rounded-lg border border-slate-400 bg-white p-4 pr-12">
      <div
        className="mb-1.5 flex justify-between"
        style={{
          minWidth: (minTitleWidth ?? 10) + 'rem',
        }}>
        <div className="flex items-center gap-2">
          <span className={`rounded-sm p-1.5 ${bgIconClassName}`}>{icon}</span>{' '}
          <p className={`mb-0`}>{title}</p>
        </div>
        {displayValue && (
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
          color={bgBarClassName}
        />
      </div>
    </div>
  )
}
