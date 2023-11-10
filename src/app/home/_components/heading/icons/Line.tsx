import { everyIcons } from '@/components/icons'
import { useIsClient } from '@/hooks/useIsClient'
import { useMemo } from 'react'

type Props = {
  position: 'top' | 'bottom'
}

const numberOfIcons = 4

export default function Line({ position }: Props) {
  const isClient = useIsClient()

  const icons = useMemo(() => {
    const icons: any[] = []
    for (let i = 0; i < numberOfIcons; i++) {
      icons.push({
        rotation: (Math.random() - 0.5) * 10,
        Icon: everyIcons[Math.round(Math.random() * (everyIcons.length - 1))],
      })
    }
    return icons
  }, [])
  return (
    <div
      className={`absolute flex w-full justify-around ${
        position === 'top' ? 'top-8' : 'bottom-4 flex-row-reverse'
      }`}>
      {icons.map(({ rotation, Icon }, index) => (
        <div
          key={String(rotation) + String(index)}
          className={`${
            isClient ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-500 motion-reduce:transition-none`}
          style={{
            transform: `rotate(${rotation}deg)`,
            transitionDelay: `${index * 100 + 500}ms`,
          }}>
          <Icon />
        </div>
      ))}
    </div>
  )
}
