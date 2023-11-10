'use client'

import { useIsClient } from '@/hooks/useIsClient'
import { useWindowSize } from '@/hooks/useWindowSize'
import { useMemo } from 'react'
import Circle from './icons/Circle'
import Line from './icons/Line'

const getNumberOfCircles = (windowWidth: number) => {
  if (windowWidth >= 2000) {
    return 8
  } else if (windowWidth >= 1400) {
    return 5
  } else if (windowWidth >= 768) {
    return 3
  } else return 1
}
export default function Icons() {
  const isClient = useIsClient()

  const { windowWidth } = useWindowSize()

  const circles = useMemo(() => {
    const distanceBetweenIcons = 5

    const numberOfCircles = getNumberOfCircles(windowWidth)
    const circles: number[] = []
    for (let i = 0; i < numberOfCircles; i++) {
      circles.push(i * distanceBetweenIcons)
    }
    return circles
  }, [windowWidth])

  if (!isClient) return null

  if (windowWidth < 768) {
    return (
      <div className="absolute left-0 top-0 h-full w-full" aria-hidden="true">
        <Line position="top" />
        <Line position="bottom" />
      </div>
    )
  }
  return (
    <div className="absolute left-1/2 top-1/2 h-1/2 w-1/2" aria-hidden="true">
      {circles.map((distance) => (
        <Circle key={distance} distance={distance} />
      ))}
    </div>
  )
}
