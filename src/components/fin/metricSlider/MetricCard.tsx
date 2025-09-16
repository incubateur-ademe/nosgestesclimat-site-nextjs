import { carboneMetric } from '@/constants/model/metric'
import { useCurrentMetric } from '@/hooks/useCurrentMetric'
import type { Metric } from '@/publicodes-state/types'
import type { KeyboardEvent, PropsWithChildren, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export default function MetricCard({
  metricTitle,
  metric,
  children,
  isSticky,
  ...props
}: PropsWithChildren<{
  metricTitle: {
    desktop: ReactNode
    mobile: ReactNode
  }
  metric: Metric
  isSticky?: boolean
  tabId?: string
  panelId?: string
  onKeyDown?: (e: KeyboardEvent) => void
}>) {
  const { currentMetric, setCurrentMetric } = useCurrentMetric()

  const isSelected = currentMetric === metric

  const handleSelectMetric = () => {
    if (isSelected) return

    setCurrentMetric(metric)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const { tabId, panelId, onKeyDown } = props as {
    tabId?: string
    panelId?: string
    onKeyDown?: (e: KeyboardEvent) => void
  }

  const headerId = tabId ? `${tabId}-label` : undefined

  return (
    <div
      className={twMerge(
        'flex-1 rounded-b-xl bg-white',
        'border-primary-100 pointer-events-auto relative rounded-xl border-[3px]',
        isSelected ? 'border-primary-700 bg-white' : 'bg-slate-100',
        isSticky && 'rounded-none rounded-br-xl rounded-bl-xl',
        metric === carboneMetric
          ? 'rounded-r-none rounded-bl-xl'
          : 'rounded-l-none rounded-br-xl'
      )}>
      <div
        id={headerId}
        className={twMerge(
          'border-primary-200 absolute top-0 right-0 left-0 mx-1 border-b py-1 text-center text-xs',
          isSelected && 'bg-primary-700 mx-0 text-white',
          metric === carboneMetric ? 'rounded-tl-lg' : 'rounded-tr-lg',
          isSticky && 'rounded-none'
        )}>
        {metricTitle.mobile}
      </div>

      <button
        type="button"
        role="tab"
        id={tabId}
        aria-controls={panelId}
        aria-selected={isSelected}
        aria-labelledby={headerId}
        tabIndex={isSelected ? 0 : -1}
        onClick={handleSelectMetric}
        onKeyDown={onKeyDown}
        className={twMerge(
          'focus:ring-primary-700 pointer-events-auto absolute inset-0 z-10 block h-full w-full rounded-xl focus:ring-4 focus:ring-offset-2 focus:ring-offset-white focus-visible:outline-none',
          metric === carboneMetric
            ? 'rounded-r-none rounded-bl-xl'
            : 'rounded-l-none rounded-br-xl'
        )}>
        <span className="sr-only">{metricTitle.mobile}</span>
      </button>

      <div
        role="tabpanel"
        id={panelId}
        aria-labelledby={tabId}
        className={twMerge(
          'h-full w-full',
          isSticky && 'pointer-events-none max-h-28 overflow-hidden md:mt-1'
        )}>
        {children}
      </div>

      {!isSelected && (
        <div className="pointer-events-none absolute top-0 right-0 bottom-0 left-0 bg-white opacity-10 transition-opacity duration-300 group-hover:opacity-100" />
      )}
    </div>
  )
}
