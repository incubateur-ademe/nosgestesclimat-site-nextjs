'use client'

import { everyIcons } from '@/components/icons'
import { useWindowSize } from '@/hooks/useWindowSize'
import { useEffect, useMemo, useState } from 'react'
import Icon from './circle/Icon'

type Props = {
  distance: number
}

const visibleIndex = [9, 10, 11, 12, 13, 14, 15, 16, 28, 29, 30, 31, 32, 33, 34]

export default function Circle({ distance }: Props) {
  const { windowWidth } = useWindowSize()

  const rotation = useMemo(
    () => Math.random() * 10 + (windowWidth >= 768 ? 45 : 140),
    [windowWidth]
  )

  const [icons, setIcons] = useState<any[]>([])
  useEffect(() => {
    const newIcons: any[] = []
    for (let i = 0; i < 36; i++) {
      newIcons.push({
        angle: i * 10,
        IconComponent:
          everyIcons[Math.round(Math.random() * (everyIcons.length - 1))],
      })
    }
    setIcons(newIcons.filter((icon, index) => visibleIndex.includes(index)))
  }, [])

  const [count, setCount] = useState(1)

  return (
    <div
      className={`absolute ${count % 10 === 0 ? 'animate-iconsRotation' : ''}`}>
      <div
        className={`absolute transition-transform `}
        style={{
          transform: `rotate(${rotation}deg)`,
        }}>
        {icons.map(({ angle, IconComponent, delay }, index) => (
          <Icon
            key={angle + IconComponent}
            IconComponent={IconComponent}
            angle={angle}
            rotation={rotation}
            distance={distance}
            delay={delay}
            onClick={() => {
              const indexOfIconA = index
              const indexOfIconB = Math.round(
                Math.random() * (icons.length - 1)
              )
              setCount((prevCount) => prevCount + 1)
              setIcons((prevIcons) =>
                prevIcons.map(({ IconComponent, angle }, index) => {
                  if (index === indexOfIconA) {
                    return {
                      angle,
                      IconComponent: icons[indexOfIconB].IconComponent,
                      delay: 1000,
                    }
                  }
                  if (index === indexOfIconB) {
                    return {
                      angle,
                      IconComponent: icons[indexOfIconA].IconComponent,
                      delay: 1250,
                    }
                  }
                  return { angle, IconComponent, delay: null }
                })
              )
            }}
          />
        ))}
      </div>
    </div>
  )
}
