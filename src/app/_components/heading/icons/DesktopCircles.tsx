'use client'

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
  return (
    <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
      {circles.map((circle) =>
        circle.map(({ iconIndex, x, y, rotation, delay }) => (
          <Icon
            onClick={() => {
              console.log(iconIndex)
            }}
            key={String(x) + String(y)}
            iconIndex={iconIndex}
            x={x}
            y={y}
            rotation={rotation}
            delay={delay}
            scale={1}
          />
        ))
      )}
    </div>
  )
}
