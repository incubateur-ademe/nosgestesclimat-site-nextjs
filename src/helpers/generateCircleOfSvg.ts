import { everyIcons } from '@/components/icons'

type Props = {
  numPieces: number
  radius: number
  centerX?: number
  centerY?: number
  maxDelay?: number
  iconSize?: number
  boundary: number[]
}

export const generateCircleOfSvg = ({
  numPieces,
  radius,
  centerX = 0,
  centerY = 0,
  maxDelay = 1000,
  iconSize = 64,
  boundary,
}: Props) => {
  const icons = []
  const randomNumberToAddToAngle = Math.random() / 2
  for (let i = 0; i < numPieces; i++) {
    // Choose a random icon from the list
    const iconIndex = Math.floor(Math.random() * everyIcons.length)

    const angle = (i / numPieces) * 2 * Math.PI + randomNumberToAddToAngle
    const x = centerX + radius * Math.cos(angle) - iconSize / 2
    const y = centerY + radius * Math.sin(angle) - iconSize / 2

    let rotation = angle * (180 / Math.PI) // Convert angle to degrees
    // If the piece is on the left side, add 180 degrees to the rotation
    if (x < centerX) {
      rotation += 180
    }
    // Add a random rotation between -10% and 10% of the initial rotation
    const randomRotation = rotation * (Math.random() * 0.2 - 0.1) - rotation
    rotation += randomRotation

    // Add a random delay before displaying the icon
    const delay = Math.random() * maxDelay

    if (y > boundary[0] && y < boundary[1]) {
      icons.push({
        iconIndex,
        x,
        y,
        rotation,
        delay,
      })
    }
  }
  return icons
}
