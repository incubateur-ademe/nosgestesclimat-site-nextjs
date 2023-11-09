'use client'

import { useEffect, useMemo, useState } from 'react'
import Icon from './circle/Icon'

type Props = {
  distance: number
}

const visibleIndex = [9, 10, 11, 12, 13, 14, 15, 16, 28, 29, 30, 31, 32, 33, 34]

export default function Circle({ distance }: Props) {
  const rotation = useMemo(() => Math.random() * 10 + 45, [])

  const [icons, setIcons] = useState<any[]>([])
  useEffect(() => {
    const newIcons: any[] = []
    for (let i = 0; i < 36; i++) {
      newIcons.push({
        angle: i * 10,
        icon: String(Math.round(Math.random() * 100)),
      })
    }
    setIcons(newIcons.filter((icon, index) => visibleIndex.includes(index)))
  }, [])

  return (
    <div
      className="absolute"
      style={{
        transform: `rotate(${rotation}deg)`,
      }}>
      {icons.map(({ angle, icon }, index) => (
        <Icon
          key={angle}
          icon={icon}
          angle={angle}
          rotation={rotation}
          distance={distance}
          onClick={() => {
            const indexOfIconA = index
            const indexOfIconB = Math.round(Math.random() * (icons.length - 1))

            setIcons((prevIcons) =>
              prevIcons.map(({ icon, angle }, index) => {
                console.log()
                if (index === indexOfIconA) {
                  return {
                    angle,
                    icon: icons[indexOfIconB].icon,
                  }
                }
                if (index === indexOfIconB) {
                  return {
                    angle,
                    icon: icons[indexOfIconA].icon,
                  }
                }
                return { angle, icon }
              })
            )
          }}
        />
      ))}
    </div>
  )
}
