import { everyIcons } from '@/components/icons'

type Props = {
  numPieces: number
  radius: number
  centerX?: number
  centerY?: number
  maxDelay?: number
}

const generateCircleOfSvg = ({
  numPieces,
  radius,
  centerX = 0,
  centerY = 0,
  maxDelay = 1000,
}: Props) => {
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
    const delay = Math.random() * maxDelay
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

export default generateCircleOfSvg
