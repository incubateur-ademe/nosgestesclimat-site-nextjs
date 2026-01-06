import { carboneMetric } from '@/constants/model/metric'
import {
  captureClickFootprint,
  endClickFootprint,
} from '@/constants/tracking/pages/end'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useCurrentMetric } from '@/hooks/useCurrentMetric'
import type { Metric } from '@/publicodes-state/types'
import { trackEvent, trackPosthogEvent } from '@/utils/analytics/trackEvent'
import type { KeyboardEvent, PropsWithChildren, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export default function MetricCard({
  metricTitle,
  metric,
  children,
  isSticky,
  isSharePage,
  isStatic,
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
  isSharePage?: boolean
  isStatic?: boolean
}>) {
  const { currentMetric, setCurrentMetric } = useCurrentMetric()

  const { t } = useClientTranslation()

  const isSelected = isSharePage ? false : currentMetric === metric

  const handleSelectMetric = () => {
    if (isSelected) return

    setCurrentMetric(metric)

    trackEvent(endClickFootprint(metric))
    trackPosthogEvent(captureClickFootprint(metric))

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
        'border-primary-100 pointer-events-auto relative flex-1 rounded-xl rounded-b-xl border bg-white',
        isSelected
          ? 'border-primary-700 bg-white'
          : 'border-slate-500 bg-slate-100',
        isSticky && 'rounded-none rounded-br-xl rounded-bl-xl',
        metric === carboneMetric
          ? 'rounded-none rounded-l-xl'
          : 'rounded-none rounded-r-xl',
        isStatic && 'pointer-events-none border-slate-600 bg-white'
      )}>
      <div
        id={headerId}
        className={twMerge(
          'border-primary-200 absolute top-0 right-0 left-0 mx-1 border-b py-1 text-center text-xs',
          isSelected && 'bg-primary-700 mx-0 text-white',
          metric === carboneMetric ? 'rounded-tl-lg' : 'rounded-tr-lg'
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
        title={`${metricTitle.mobile} - ${isSelected ? t('Métrique sélectionnée') : t('Sélectionner cette métrique')}`}
        onClick={handleSelectMetric}
        onKeyDown={onKeyDown}
        className={twMerge(
          'focus:ring-primary-700 pointer-events-auto absolute inset-0 z-10 block h-full w-full rounded-xl focus:ring-3 focus:ring-offset-3 focus:outline-hidden',
          metric === carboneMetric
            ? 'rounded-r-none rounded-bl-xl'
            : 'rounded-l-none rounded-br-xl',
          isSharePage && 'pointer-events-none'
        )}>
        <span className="sr-only">{metricTitle.mobile}</span>
      </button>

      <div
        role="tabpanel"
        id={panelId}
        aria-labelledby={tabId}
        className={twMerge(
          'h-full w-full',
          isSticky && 'pointer-events-none max-h-28 overflow-hidden md:mt-4'
        )}>
        {children}
      </div>

      {!isSelected && (
        <div className="pointer-events-none absolute top-0 right-0 bottom-0 left-0 bg-white opacity-10 transition-opacity duration-300 group-hover:opacity-100" />
      )}
    </div>
  )
}
