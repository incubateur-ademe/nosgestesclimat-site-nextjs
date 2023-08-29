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
    <div className="absolute right-4 py-2 px-4 bg-white rounded text-primaryDark">
      <strong className="text-lg">{displayDifference}</strong>{' '}
      <span className="font-light text-xs">
        kgCO<sub>2</sub>e
      </span>
    </div>
  )
}
