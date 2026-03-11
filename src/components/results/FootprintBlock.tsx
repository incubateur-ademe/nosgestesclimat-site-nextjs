import { carboneMetric } from '@/constants/model/metric'
import { titleSizesClassNames } from '@/design-system/layout/Title'
import { formatFootprint } from '@/helpers/formatters/formatFootprint'
import type { Locale } from '@/i18nConfig'
import type { Metric } from '@/publicodes-state/types'
import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
  locale: Locale
  value: number
  title: ReactNode
  metric?: Metric
  unitSuffix: ReactNode
}
export default function FootprintBlock({
  locale,
  value,
  title,
  metric = carboneMetric,
  unitSuffix,
}: Props) {
  const { formattedValue, unit } = formatFootprint(value, {
    locale: locale as string,
    metric,
  })

  return (
    <div className="bg-primary-50 mb-12 rounded-2xl p-8">
      <h1 className="mb-0">
        <span className="mb-1 block text-lg font-normal">{title}</span>

        <span
          className={twMerge(
            titleSizesClassNames.lg,
            'text-primary-600 font-bold!'
          )}>
          {formattedValue} {unit} {unitSuffix}
        </span>
      </h1>
    </div>
  )
}
