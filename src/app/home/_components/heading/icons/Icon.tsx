'use client'

import { everyIcons } from '@/components/icons'
import { useIsClient } from '@/hooks/useIsClient'

type Props = {
  iconIndex: any
  x: number
  y: number
  rotation: number
  delay: number
}

export default function Icon({ iconIndex, x, y, rotation, delay }: Props) {
  const isClient = useIsClient()

  const IconComponent = everyIcons[iconIndex]

  return (
    <div
      className={`absolute transition-opacity duration-500 ${
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
