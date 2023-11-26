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

export default function MobileCircles({ circles }: Props) {
  return (
    <div className="absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2 md:hidden">
      {circles.map((circle) =>
        circle.map(({ iconIndex, x, y, rotation, delay }) => (
          <Icon
            key={String(x) + String(y)}
            iconIndex={iconIndex}
            x={x}
            y={y}
            rotation={rotation}
            delay={delay}
            scale={0.5}
          />
        ))
      )}
    </div>
  )
}
