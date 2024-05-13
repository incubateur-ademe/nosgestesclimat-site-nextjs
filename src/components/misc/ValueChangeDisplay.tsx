'use client'

import { formatCarbonFootprint } from '@/helpers/formatCarbonFootprint'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import { useRule } from '@/publicodes-state'
import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

export default function ValueChangeDisplay({
  className,
}: {
  className?: string
}) {
  const { t } = useClientTranslation()
  const locale = useLocale()

  const { numericValue } = useRule('bilan')
  const prevValue = useRef(numericValue)

  const [displayDifference, setDisplayDifference] = useState(0)

  const [shouldDisplay, setShouldDisplay] = useState(false)

  useEffect(() => {
    const difference = numericValue - prevValue.current

    setDisplayDifference(difference)

    setShouldDisplay(difference !== 0)

    prevValue.current = numericValue

    const timer = setTimeout(() => setShouldDisplay(false), 3000)
    return () => clearTimeout(timer)
  }, [numericValue, locale])

  const { formattedValue, unit } = formatCarbonFootprint(displayDifference, {
    locale,
    t,
  })

  if (!shouldDisplay) return

  return (
    <div
      className={twMerge('animate-valuechange whitespace-nowrap', className)}
      key={numericValue}>
      <strong className="text-lg">
        {displayDifference > 0 ? '+' : '-'} {formattedValue}
      </strong>{' '}
      <span className="text-xs">{unit}</span>
    </div>
  )
}
