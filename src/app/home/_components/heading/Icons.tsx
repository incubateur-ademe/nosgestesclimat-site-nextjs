import { everyIcons } from '@/components/icons'
import Icon from './icons/Icon'

const centerX = 0
const centerY = 0
const placeSvgsInCircle = (numPieces: number, radius: number) => {
  const icons = []
  for (let i = 0; i < numPieces; i++) {
    const iconIndex = Math.floor(Math.random() * everyIcons.length)

    const angle = (i / numPieces) * 2 * Math.PI
    const x = centerX + radius * Math.cos(angle) - 16
    const y = centerY + radius * Math.sin(angle) - 16
    let rotation = angle * (180 / Math.PI) // Convert angle to degrees

    // If the piece is on the left side, add 180 degrees to the rotation
    if (x < centerX) {
      rotation += 180
    }
    const delay = Math.random() * 1000
    // Add a random rotation between -10% and 10% of the initial rotation
    const randomRotation = rotation * (Math.random() * 0.2 - 0.1)
    rotation += randomRotation
    icons.push({
      iconIndex,
      x,
      y,
      rotation,
      delay,
    })
  }
  return icons
}

const circles = [
  placeSvgsInCircle(30, 450),
  placeSvgsInCircle(35, 525),
  placeSvgsInCircle(40, 600),
  placeSvgsInCircle(45, 675),
  placeSvgsInCircle(50, 750),
]

export default async function Icons() {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      {circles.map((circle) =>
        circle.map(({ iconIndex, x, y, rotation, delay }) => (
          <Icon
            key={String(x) + String(y)}
            iconIndex={iconIndex}
            x={x}
            y={y}
            rotation={rotation}
            delay={delay}
          />
        ))
      )}
    </div>
  )
}
