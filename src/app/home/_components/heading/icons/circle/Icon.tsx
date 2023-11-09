/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client'

import { useIsClient } from '@/hooks/useIsClient'
import { MouseEventHandler, useMemo } from 'react'

type Props = {
  icon: string
  angle: number
  rotation: number
  distance: number
  odd: boolean
  onClick: MouseEventHandler<HTMLDivElement>
}

export default function Icon({
  icon,
  angle,
  rotation,
  distance,
  odd,
  onClick,
}: Props) {
  const isClient = useIsClient()
  const delay = useMemo(() => Math.random() * 1000, [])
  const iconRotation = useMemo(() => (Math.random() - 0.5) * 60, [])

  return (
    <div
      className={`absolute w-full origin-left ${odd ? 'hidden' : ''} ${
        isClient ? 'opacity-100' : 'opacity-0'
      } transition-opacity md:block`}
      style={{
        transform: `rotate(${angle}deg)`,
        transitionDelay: `${delay}ms`,
      }}>
      <div
        className="absolute origin-center cursor-default"
        style={{
          left: `calc(10rem + 20vw + ${distance}rem)`,
          transform: `rotate(${-(angle + rotation) + iconRotation}deg)`,
        }}
        onClick={onClick}>
        {icon}
      </div>
    </div>
  )
}
