'use client'

import {
  homeClickEmoji,
  homeMemorySuccess,
} from '@/constants/tracking/pages/home'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useEffect, useState } from 'react'
import DesktopIcon from './desktopCircles/DesktopIcon'

type Props = {
  circles: {
    iconIndex: number
    x: number
    y: number
    rotation: number
    delay: number
  }[][]
}

type Icon = {
  iconIndex: number
  x: number
  y: number
}
export default function DesktopCircles({ circles }: Props) {
  const [firstSelected, setFirstSelected] = useState<Icon | null>(null)
  const [secondSelected, setSecondSelected] = useState<Icon | null>(null)

  const [validatedIcons, setValidatedIcons] = useState<Icon[]>([])

  const [isWrong, setIsWrong] = useState(false)

  useEffect(() => {
    setFirstSelected(null)
    setSecondSelected(null)
  }, [circles])

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined = undefined
    if (firstSelected && secondSelected) {
      if (firstSelected.iconIndex === secondSelected.iconIndex) {
        trackEvent(homeMemorySuccess)
        setValidatedIcons((prevValidatedIcons) => [
          ...prevValidatedIcons,
          firstSelected,
          secondSelected,
        ])
      } else {
        setIsWrong(true)
      }
      timer = setTimeout(() => {
        setFirstSelected(null)
        setSecondSelected(null)
        setIsWrong(false)
      }, 1000)
    }
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [firstSelected, secondSelected])

  return (
    <div
      className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block"
      aria-hidden={true}>
      {circles.map((circle) =>
        circle.map(({ iconIndex, x, y, rotation, delay }) => (
          <DesktopIcon
            onClick={() => {
              trackEvent(homeClickEmoji)
              if (!firstSelected) {
                setFirstSelected({ iconIndex, x, y })
                return
              }
              if (isMatch({ iconIndex, x, y }, firstSelected)) {
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
            isValidated={validatedIcons.some((validatedIcon) =>
              isMatch({ iconIndex, x, y }, validatedIcon)
            )}
            isWrong={isWrong}
          />
        ))
      )}
    </div>
  )
}

const isMatch = (icon1: Icon, icon2: Icon | null) =>
  JSON.stringify(icon1) === JSON.stringify(icon2)
