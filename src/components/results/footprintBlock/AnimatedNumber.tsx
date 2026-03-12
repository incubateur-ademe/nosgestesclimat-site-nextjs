'use client'

import { useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { CountUp } from 'use-count-up'

interface Props {
  value: number
}

export default function AnimatedNumber({ value }: Props) {
  const reducedMotion = useReducedMotion()
  const [isCounting, setIsCounting] = useState(false)

  useEffect(() => {
    // Wait for the entering FootprintBlock animation to complete
    const id = setTimeout(() => {
      setIsCounting(true)
    }, 200)

    return () => clearTimeout(id)
  }, [])

  return (
    <CountUp
      isCounting={isCounting}
      end={value}
      duration={1.5}
      start={reducedMotion ? value : 0}
      updateInterval={0.033}
      easing="linear"
      decimalSeparator=","
      thousandsSeparator=" "
    />
  )
}
