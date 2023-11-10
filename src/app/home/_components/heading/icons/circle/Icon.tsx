/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client'

import { useIsClient } from '@/hooks/useIsClient'
import { MouseEventHandler, useMemo } from 'react'

type Props = {
  IconComponent: any
  angle: number
  rotation: number
  distance: number
  delay?: number
  onClick: MouseEventHandler<HTMLDivElement>
}

export default function Icon({
  IconComponent,
  angle,
  rotation,
  distance,
  delay,
  onClick,
}: Props) {
  const isClient = useIsClient()
  const innerDelay = useMemo(() => Math.random() * 1000, [])
  const iconRotation = useMemo(() => (Math.random() - 0.5) * 60, [])

  return (
    <div
      className={`absolute w-full origin-left ${
        isClient ? 'opacity-100' : 'opacity-0'
      } transition-opacity ${
        delay ? 'duration-200' : 'duration-500'
      } motion-reduce:transition-none`}
      style={{
        transform: `rotate(${angle}deg)`,
        transitionDelay: `${delay || innerDelay}ms`,
      }}>
      <div
        className="absolute origin-center cursor-default"
        style={{
          left: `calc(10rem + 20vw + ${distance}rem)`,
          transform: `rotate(${-(angle + rotation) + iconRotation}deg)`,
        }}
        onClick={onClick}>
        <IconComponent />
      </div>
    </div>
  )
}
