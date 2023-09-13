'use client'

import { useRule } from '@/publicodes-state'
import { useEffect, useState } from 'react'

export default function ValueChangeDisplay() {
  const { numericValue } = useRule('bilan')
  const [prevValue, setPrevValue] = useState(numericValue)

  const displayDifference = `${
    numericValue - prevValue > 0 ? '+' : '-'
  } ${Math.abs(numericValue - prevValue).toLocaleString('fr-fr', {
    maximumFractionDigits: 1,
  })}`

  useEffect(() => {
    const timer = setTimeout(() => {
      setPrevValue(numericValue)
    }, 1000)
    return () => clearTimeout(timer)
  }, [numericValue])

  if (numericValue - prevValue === 0) return
  return (
    <div>
      <strong className="text-lg">{displayDifference}</strong>{' '}
      <span className="text-xs font-light">
        kgCO<sub>2</sub>e
      </span>
    </div>
  )
}
