'use client'

import { defaultMetric } from '@/constants/metric'
import { formatFootprint } from '@/helpers/formatters/formatFootprint'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import { useForm, useRule } from '@/publicodes-state'
import type { Metrics } from '@incubateur-ademe/nosgestesclimat'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

export default function ValueChangeDisplay({
  className,
  metric = defaultMetric,
  size = 'sm',
}: {
  className?: string
  metric?: Metrics
  size?: 'sm' | 'md'
}) {
  const { t } = useClientTranslation()
  const locale = useLocale()

  const pathname = usePathname()

  const { currentQuestion } = useForm()

  const { numericValue } = useRule('bilan', metric)

  const prevValue = useRef(numericValue)

  const [displayDifference, setDisplayDifference] = useState(0)

  const prevQuestion = useRef(currentQuestion)

  // We need this value to force the component to re-render when the numericValue changes
  // We don't use numericValue directly because it update before the displayDifference
  const [keyFromNumericValue, setKeyFromNumericValue] = useState(numericValue)

  useEffect(() => {
    if (prevQuestion.current !== currentQuestion) {
      setDisplayDifference(0)
    }
  }, [currentQuestion])

  useEffect(() => {
    const difference = numericValue - prevValue.current

    setDisplayDifference(difference)
    setKeyFromNumericValue(numericValue)

    prevValue.current = numericValue
  }, [numericValue, locale])

  const isNegative = displayDifference < 0

  const { formattedValue, unit } = formatFootprint(displayDifference, {
    locale,
    metric,
    t,
  })

  if (displayDifference === 0 || !pathname.includes('simulateur/bilan')) {
    return null
  }

  return (
    <div
      className={twMerge(
        'absolute right-2 top-1 -z-0 w-auto whitespace-nowrap',
        isNegative
          ? 'animate-valuechange-reverse text-green-700'
          : 'animate-valuechange text-red-700',
        className
      )}
      key={keyFromNumericValue}
      aria-label={t(
        '{{signe}} {{value}} {{unit}} sur votre empreinte {{metric}}',
        {
          signe: isNegative ? t('moins') : t('plus'),
          value: formattedValue,
          unit,
          metric: metric === 'carbone' ? t('carbone') : t('eau'),
        }
      )}>
      <span
        className={twMerge(
          'text-sm font-semibold',
          size === 'md' ? 'text-base' : ''
        )}>
        {displayDifference > 0 ? '+' : ''}
        {formattedValue}
      </span>{' '}
      <span
        className={twMerge(
          'text-xs font-normal',
          size === 'md' ? 'text-sm' : ''
        )}>
        {unit}
      </span>
    </div>
  )
}
