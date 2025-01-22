import Badge from '@/design-system/layout/Badge'
import { useCurrentMetric } from '@/hooks/useCurrentMetric'
import type { Metric } from '@/publicodes-state/types'
import type { PropsWithChildren, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export default function MetricCard({
  metricTitle,
  metric,
  children,
  isSticky,
}: PropsWithChildren<{
  metricTitle: ReactNode
  metric: Metric
  isSticky?: boolean
}>) {
  const { currentMetric, setCurrentMetric } = useCurrentMetric()

  const isSelected = currentMetric === metric

  return (
    <button
      onClick={() => setCurrentMetric(metric)}
      className={twMerge(
        'last: pointer-events-auto relative !flex h-full flex-1 flex-col overflow-hidden rounded-xl rounded-l-xl rounded-r-none border-[3px] border-r-0 border-primary-50 bg-white last:rounded-l-none last:rounded-r-xl last:border-l-0 last:border-r-[3px]',
        isSelected &&
          ' border-r-[3px] border-primary-700 bg-primary-50 last:border-l-[3px]'
      )}>
      <Badge size="xs" className="absolute right-0 top-0 mx-2 mt-2">
        {metricTitle}
      </Badge>
      <div
        className={twMerge(
          'h-full',
          isSticky && 'pointer-events-none max-h-20 overflow-hidden'
        )}>
        {children}
      </div>

      {!isSelected && (
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-white opacity-10 transition-opacity duration-300 group-hover:opacity-100" />
      )}
    </button>
  )
}
