import Emoji from '@/design-system/utils/Emoji'
import { ReactElement, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

const fishEmojis = [
  '🐟',
  '🐠',
  '🐡',
  '🦈',
  '🐙',
  '🦑',
  '🦐',
  '🦞',
  '🦀',
  '🐬',
  '🐳',
  '🐋',
]

const fishAnimations = [
  'animate-swim',
  'animate-swim-fast',
  'animate-swim-slow',
  'animate-swim-backwards',
  'animate-swim-backwards-fast',
  'animate-swim-backwards-slow',
]

const generateTopPosition = () => {
  return `${Math.floor(Math.random() * 50)}%`
}

type Props = {
  numberOfFish: number
}

export default function Fish({ numberOfFish }: Props) {
  const [fishes, setFishes] = useState<ReactElement[]>([])
  useEffect(() => {
    if (numberOfFish !== fishes.length) {
      setFishes((prevFishes) => {
        const newFishes = [...prevFishes]
        if (numberOfFish > fishes.length) {
          for (let i = 0; i < numberOfFish - fishes.length; i++) {
            newFishes.push(
              <Emoji
                key={Math.random()}
                className={twMerge(
                  'absolute text-lg',
                  fishAnimations[
                    Math.floor(Math.random() * fishAnimations.length)
                  ]
                )}
                style={{ top: generateTopPosition() }}>
                {fishEmojis[Math.floor(Math.random() * fishEmojis.length)]}
              </Emoji>
            )
          }
        } else {
          newFishes.splice(numberOfFish, fishes.length - numberOfFish)
        }
        return newFishes
      })
    }
  }, [numberOfFish, fishes])

  return <div className="relative h-full">{fishes.map((fish) => fish)}</div>
}
