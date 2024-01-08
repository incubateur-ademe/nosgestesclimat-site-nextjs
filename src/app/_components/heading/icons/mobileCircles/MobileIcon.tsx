import { everyIcons } from '@/components/icons'

type Props = {
  iconIndex: any
  x: number
  y: number
  rotation: number
  scale?: number
}

export default function MobileIcon({
  iconIndex,
  x,
  y,
  rotation,
  scale = 1,
}: Props) {
  const IconComponent = everyIcons[iconIndex]

  return (
    <div
      className="absolute"
      style={{
        transform: `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${scale})`,
      }}>
      <IconComponent />
    </div>
  )
}
