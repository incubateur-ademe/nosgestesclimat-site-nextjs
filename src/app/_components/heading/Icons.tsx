import generateCircleOfSvg from '@/helpers/generateCircleOfSvg'
import Icon from './icons/Icon'

const desktopCircles = [
  generateCircleOfSvg({ numPieces: 30, radius: 450 }),
  generateCircleOfSvg({ numPieces: 35, radius: 535 }),
  generateCircleOfSvg({ numPieces: 40, radius: 620 }),
  generateCircleOfSvg({ numPieces: 45, radius: 705 }),
  generateCircleOfSvg({ numPieces: 50, radius: 790 }),
  generateCircleOfSvg({ numPieces: 55, radius: 875 }),
  generateCircleOfSvg({ numPieces: 60, radius: 960 }),
  generateCircleOfSvg({ numPieces: 65, radius: 1045 }),
  generateCircleOfSvg({ numPieces: 70, radius: 1130 }),
  generateCircleOfSvg({ numPieces: 75, radius: 1215 }),
]

// const mobileCircles = [
//   generateCircleOfSvg({ numPieces: 15, radius: 240, iconSize: 24 }),
//   generateCircleOfSvg({ numPieces: 20, radius: 325, iconSize: 24 }),
// ]

export default async function Icons() {
  return (
    <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
      {desktopCircles.map((circle) =>
        circle.map(({ iconIndex, x, y, rotation, delay }) => (
          <Icon
            key={String(x) + String(y)}
            iconIndex={iconIndex}
            x={x}
            y={y}
            rotation={rotation}
            delay={delay}
            size={12}
          />
        ))
      )}
    </div>
  )
}
