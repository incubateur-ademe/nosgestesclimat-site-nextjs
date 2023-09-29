'use client'

import { useRule } from '@/publicodes-state'
import { useEffect, useRef, useState } from 'react'

export default function ValueChangeDisplay() {
  const { numericValue } = useRule('bilan')
  const prevValue = useRef(numericValue)

  const [displayDifference, setDisplayDifference] = useState('')

  const [shouldDisplay, setShouldDisplay] = useState(false)

  useEffect(() => {
    const difference = numericValue - prevValue.current

    setDisplayDifference(
      `${difference > 0 ? '+' : '-'} ${Math.abs(difference).toLocaleString(
        'fr-fr',
        {
          maximumFractionDigits: 1,
        }
      )}`
    )

    setShouldDisplay(difference !== 0)

    prevValue.current = numericValue

    const timer = setTimeout(() => setShouldDisplay(false), 3000)
    return () => clearTimeout(timer)
  }, [numericValue])

  if (!shouldDisplay) return
  return (
    <div>
      <strong className="text-lg">{displayDifference}</strong>{' '}
      <span className="text-xs font-light">
        kgCO<sub>2</sub>e
      </span>
    </div>
  )
}
