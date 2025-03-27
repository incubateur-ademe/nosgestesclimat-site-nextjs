import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useCurrentMetric } from '@/hooks/useCurrentMetric'
import type { Metric } from '@/publicodes-state/types'
import type { PropsWithChildren, ReactNode } from 'react'
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
}>) {
  const { currentMetric, setCurrentMetric } = useCurrentMetric()

  const { t } = useClientTranslation()

  const isSelected = currentMetric === metric

  return (
    <button
      onClick={() => setCurrentMetric(metric)}
      className={twMerge(
        'pointer-events-auto relative flex! h-full flex-1 flex-col overflow-hidden rounded-xl border-[3px] border-primary-50 bg-white',
        isSelected && 'border-primary-700 bg-primary-50'
      )}
      aria-label={
        isSelected
          ? t('Empreinte carbone, sélectionné, voir le détail ci-dessous')
          : t("Sélectionner l'empreinte carbone, voir le détail ci-dessous")
      }
      {...props}>
      <div className="absolute left-0 right-0 top-0 mx-1 border-b border-primary-200 py-1 text-center text-xs">
        {metricTitle.mobile}
      </div>

      <div
        className={twMerge(
          'h-full w-full',
          isSticky && 'pointer-events-none max-h-28 overflow-hidden lg:mt-6'
        )}>
        {children}
      </div>

      {!isSelected && (
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-white opacity-10 transition-opacity duration-300 group-hover:opacity-100" />
      )}
    </button>
  )
}
