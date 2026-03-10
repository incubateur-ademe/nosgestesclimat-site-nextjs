import { carboneMetric } from '@/constants/model/metric'
import { formatFootprint } from '@/helpers/formatters/formatFootprint'
import type { Tendency } from '@/helpers/server/model/utils/getTendency'
import type { Locale } from '@/i18nConfig'
import type { Metric } from '@/publicodes-state/types'
import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import TendencyIndicator from './TendencyIndicator'

interface Props {
  className?: string
  locale: Locale
  value: number
  title: ReactNode
  metric?: Metric
  unitSuffix: ReactNode
  tendency?: Tendency
}
export default function FootprintBlock({
  className,
  locale,
  value,
  title,
  metric = carboneMetric,
  unitSuffix,
  tendency,
}: Props) {
  const { formattedValue, unit } = formatFootprint(value, {
    locale: locale as string,
    metric,
  })

  return (
    <div
      className={twMerge(
        'bg-primary-50 flex flex-row justify-between rounded-2xl p-8',
        className
      )}>
      <h1 className="mb-0">
        <span className="mb-1 block text-lg font-normal">{title}</span>

        <span className="text-primary-600 title-lg font-bold!">
          {formattedValue} {unit} {unitSuffix}
        </span>
      </h1>

      {tendency && <TendencyIndicator tendency={tendency} locale={locale} />}
    </div>
  )
}
