'use client'

import { formatFootprint } from '@/helpers/formatters/formatFootprint'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import { useForm, useRule } from '@/publicodes-state'
import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Trans from '../translation/Trans'

export default function ValueChangeDisplay({
  className,
}: {
  className?: string
}) {
  const { t } = useClientTranslation()
  const locale = useLocale()

  const { currentQuestion } = useForm()

  const { numericValue } = useRule('bilan')
  const prevValue = useRef(numericValue)

  const [displayDifference, setDisplayDifference] = useState(0)

  const prevQuestion = useRef(currentQuestion)

  useEffect(() => {
    if (prevQuestion.current !== currentQuestion) {
      setDisplayDifference(0)
    }
  }, [currentQuestion])

  useEffect(() => {
    const difference = numericValue - prevValue.current

    setDisplayDifference(difference)

    prevValue.current = numericValue
  }, [numericValue, locale])

  const isNegative = displayDifference < 0

  const { formattedValue, unit } = formatFootprint(displayDifference, {
    locale,
    t,
  })

  if (displayDifference === 0) {
    return null
  }

  return (
    <div
      className={twMerge(
        '-z-0 whitespace-nowrap',
        isNegative
          ? 'animate-valuechange-reverse text-green-700'
          : 'animate-valuechange text-red-700',
        className
      )}
      key={numericValue}
      aria-label={t('{{signe}} {{value}} {{unit}} sur votre empreinte', {
        signe: isNegative ? t('moins') : t('plus'),
        value: formattedValue,
        unit,
      })}>
      <strong className="text-base font-black">
        {displayDifference > 0 ? '+' : '-'}
        {formattedValue}
      </strong>{' '}
      <span className="text-xs">
        {unit} <Trans>sur votre empreinte</Trans>
      </span>
    </div>
  )
}
