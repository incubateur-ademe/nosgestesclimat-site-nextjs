'use client'

import { useEffect, useState } from 'react'

import { useRule } from '@/publicodes-state'

export default function ValueChangeDisplay() {
  const { value } = useRule('bilan')
  const [prevValue, setPrevValue] = useState(value)

  const displayDifference = `${value - prevValue > 0 ? '+' : '-'} ${Math.abs(
    value - prevValue
  ).toLocaleString('fr-fr', {
    maximumFractionDigits: 1,
  })}`

  useEffect(() => {
    const timer = setTimeout(() => {
      setPrevValue(value)
    }, 1000)
    return () => clearTimeout(timer)
  }, [value])

  if (value - prevValue === 0) return
  return (
    <div className="absolute right-24 rounded bg-white px-4 py-2 text-primaryDark">
      <strong className="text-lg">{displayDifference}</strong>{' '}
      <span className="text-xs font-light">
        kgCO<sub>2</sub>e
      </span>
    </div>
  )
}
