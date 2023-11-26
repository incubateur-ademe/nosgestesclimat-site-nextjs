'use client'

import { useState } from 'react'
import Icon from './desktopCircles/Icon'

type Props = {
  circles: {
    iconIndex: number
    x: number
    y: number
    rotation: number
    delay: number
  }[][]
}

export default function DesktopCircles({ circles }: Props) {
  const [firstSelected, setFirstSelected] = useState<any | null>(null)
  const [secondSelected, setSecondSelected] = useState<any | null>(null)

  return (
    <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
      {circles.map((circle) =>
        circle.map(({ iconIndex, x, y, rotation, delay }) => (
          <Icon
            onClick={() => {
              console.log('click')
              if (!firstSelected) {
                setFirstSelected({ iconIndex, x, y })
                return
              }
              if (!secondSelected) {
                setSecondSelected({ iconIndex, x, y })
                return
              }
            }}
            key={String(x) + String(y)}
            iconIndex={iconIndex}
            x={x}
            y={y}
            rotation={rotation}
            delay={delay}
            scale={1}
            isSelected={
              isMatch({ iconIndex, x, y }, firstSelected) ||
              isMatch({ iconIndex, x, y }, secondSelected)
            }
          />
        ))
      )}
    </div>
  )
}

const isMatch = (icon: any, selected: any) =>
  JSON.stringify(icon) === JSON.stringify(selected)
