import { useCurrentMetric } from '@/hooks/useCurrentMetric'
import type { Metric } from '@/publicodes-state/types'
import type { PropsWithChildren, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export default function MetricCard({
  metricTitle,
  metric,
  children,
}: PropsWithChildren<{
  metricTitle: ReactNode
  metric: Metric
}>) {
  const { currentMetric, setCurrentMetric } = useCurrentMetric()

  const isSelected = currentMetric === metric

  return (
    <button
      onClick={() => setCurrentMetric(metric)}
      className={twMerge(
        'relative !flex h-full flex-1 flex-col overflow-hidden rounded-xl border-4 border-primary-50 bg-gray-100',
        isSelected && 'border-primary-800'
      )}>
      <div className="bg-primary-800 px-4 py-1 text-center text-sm text-white">
        {metricTitle}
      </div>

      {children}

      {isSelected && (
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-primary-700 opacity-5 transition-opacity duration-300 group-hover:opacity-100" />
      )}
    </button>
  )
}
