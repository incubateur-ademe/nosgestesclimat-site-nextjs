'use client'

import { everyIcons } from '@/components/icons'
import { useIsClient } from '@/hooks/useIsClient'
import { useWindowSize } from '@/hooks/useWindowSize'

type Props = {
  iconIndex: any
  x: number
  y: number
  rotation: number
  delay: number
}

export default function Icon({ iconIndex, x, y, rotation, delay }: Props) {
  const isClient = useIsClient()
  const { windowWidth } = useWindowSize()
  const IconComponent = everyIcons[iconIndex]

  if (y < -300 || y > 300) return null
  if (Math.abs(x) > windowWidth / 2 + 32) return null

  return (
    <div
      className={`absolute transition-opacity delay-500 duration-500 ${
        isClient ? 'opacity-100' : 'opacity-0'
      } motion-reduce:transition-none`}
      style={{
        transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
        transitionDelay: `${delay}ms`,
      }}>
      <IconComponent />
    </div>
  )
}
