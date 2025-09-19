import { carboneMetric } from '@/constants/model/metric'
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
  isSharePage,
  ...props
}: PropsWithChildren<{
  metricTitle: {
    desktop: ReactNode
    mobile: ReactNode
  }
  metric: Metric
  isSticky?: boolean
  isSharePage?: boolean
}>) {
  const { currentMetric, setCurrentMetric } = useCurrentMetric()

  const { t } = useClientTranslation()

  const isSelected = isSharePage ? false : currentMetric === metric

  const handleSelectMetric = () => {
    if (isSelected) return

    setCurrentMetric(metric)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div className="flex-1 rounded-b-xl bg-white">
      <button
        onClick={handleSelectMetric}
        className={twMerge(
          'border-primary-100 pointer-events-auto relative flex! h-full w-full flex-1 flex-col overflow-hidden rounded-xl border-[3px] bg-white',
          isSelected && 'border-primary-700 bg-primary-50',
          isSticky && 'rounded-none rounded-br-xl rounded-bl-xl',
          metric === carboneMetric
            ? 'rounded-r-none rounded-bl-xl'
            : 'rounded-l-none rounded-br-xl',
          isSharePage && 'pointer-events-none'
        )}
        aria-label={
          isSelected
            ? t('Empreinte carbone, sélectionné, voir le détail ci-dessous')
            : t("Sélectionner l'empreinte carbone, voir le détail ci-dessous")
        }
        {...props}>
        <div className="border-primary-200 absolute top-0 right-0 left-0 mx-1 border-b py-1 text-center text-xs">
          {metricTitle.mobile}
        </div>

        <div
          className={twMerge(
            'h-full w-full',
            isSticky && 'pointer-events-none max-h-28 overflow-hidden md:mt-1'
          )}>
          {children}
        </div>

        {!isSelected && (
          <div className="absolute top-0 right-0 bottom-0 left-0 bg-white opacity-10 transition-opacity duration-300 group-hover:opacity-100" />
        )}
      </button>
    </div>
  )
}
