import { carboneMetric } from '@/constants/model/metric'
import type { Metric } from '@/publicodes-state/types'
import type { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  metricTitle: {
    desktop: string
    mobile: string
  }
  metric: Metric
  className?: string
}

export default function MetricCardServer({
  metricTitle,
  metric,
  children,
  className,
}: PropsWithChildren<Props>) {
  return (
    <div
      className={twMerge(
        'flex-1 overflow-hidden rounded-b-xl bg-white',
        'border-primary-100 pointer-events-auto relative rounded-xl border-2',
        'bg-white',
        metric === carboneMetric
          ? 'rounded-r-none rounded-bl-xl'
          : 'rounded-l-none rounded-br-xl',
        className
      )}>
      <div
        className={twMerge(
          'border-primary-200 absolute top-0 right-0 left-0 mx-1 border-b py-1 text-center text-xs',
          metric === carboneMetric ? 'rounded-tl-lg' : 'rounded-tr-lg'
        )}>
        {metricTitle.mobile}
      </div>

      <div className="h-full w-full">{children}</div>
    </div>
  )
}
