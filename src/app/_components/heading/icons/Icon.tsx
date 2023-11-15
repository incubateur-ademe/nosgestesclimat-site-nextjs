'use client'

import { everyIcons } from '@/components/icons'
import { useIsClient } from '@/hooks/useIsClient'
import { useWindowSize } from '@/hooks/useWindowSize'
import { useEffect, useState } from 'react'

type Props = {
  iconIndex: any
  x: number
  y: number
  rotation: number
  delay: number
  scale?: number
}

export default function Icon({
  iconIndex,
  x,
  y,
  rotation,
  delay,
  scale = 1,
}: Props) {
  const isClient = useIsClient()
  const { windowWidth } = useWindowSize()
  const IconComponent = everyIcons[iconIndex]

  const [isHidden, setIsHidden] = useState(true)
  useEffect(() => {
    let timer: any = null
    if (isClient) {
      timer = setTimeout(() => setIsHidden(false), 500)
    }
    return () => timer && clearTimeout(timer)
  })
  if (y < -332 || y > 300) return null
  if (Math.abs(x) > windowWidth / 2 + 32) return null
  if (!isClient) return null

  return (
    <div
      className={`absolute transition-opacity delay-500 duration-500 ${
        isHidden ? 'opacity-0' : 'opacity-100'
      } motion-reduce:transition-none`}
      style={{
        transform: `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${scale})`,
        transitionDelay: `${delay}ms`,
      }}>
      <IconComponent />
    </div>
  )
}
