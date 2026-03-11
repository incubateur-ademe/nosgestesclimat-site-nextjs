import { carboneMetric } from '@/constants/model/metric'
import { titleSizesClassNames } from '@/design-system/layout/Title'
import { formatFootprint } from '@/helpers/formatters/formatFootprint'
import type { Locale } from '@/i18nConfig'
import type { Metric } from '@/publicodes-state/types'
import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import AnimatedNumber from './footprintBlock/AnimatedNumber'

interface Props {
  className?: string
  locale: Locale
  value: number
  title: ReactNode
  metric?: Metric
  unitSuffix: ReactNode
}
export default function FootprintBlock({
  className,
  locale,
  value,
  title,
  metric = carboneMetric,
  unitSuffix,
}: Props) {
  const { formattedValue, unit } = formatFootprint(value, {
    localize: false,
    metric,
  })

  return (
    <div
      className={twMerge(
        'bg-primary-100 animate-fade-in-slide-from-top rounded-2xl p-8 [animation-delay:200ms] [animation-fill-mode:both]',
        className
      )}>
      <h1 className="mb-0">
        <span className="mb-1 block text-lg font-normal">{title}</span>

        <span
          className={twMerge(
            titleSizesClassNames.lg,
            'text-primary-600 font-bold!'
          )}>
          <AnimatedNumber value={Number(formattedValue)} /> {unit} {unitSuffix}
        </span>
      </h1>
    </div>
  )
}
