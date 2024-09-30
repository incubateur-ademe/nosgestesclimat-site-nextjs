'use client'

const circles = [
  generateCircleOfSvg({ numPieces: 30, radius: 450, boundary: [-332, 300] }),
  generateCircleOfSvg({ numPieces: 35, radius: 535, boundary: [-332, 300] }),
  generateCircleOfSvg({ numPieces: 40, radius: 620, boundary: [-332, 300] }),
  generateCircleOfSvg({ numPieces: 45, radius: 705, boundary: [-332, 300] }),
  generateCircleOfSvg({ numPieces: 50, radius: 790, boundary: [-332, 300] }),
  generateCircleOfSvg({ numPieces: 55, radius: 875, boundary: [-332, 300] }),
  generateCircleOfSvg({ numPieces: 60, radius: 960, boundary: [-332, 300] }),
  generateCircleOfSvg({ numPieces: 65, radius: 1045, boundary: [-332, 300] }),
  generateCircleOfSvg({ numPieces: 70, radius: 1130, boundary: [-332, 300] }),
  generateCircleOfSvg({ numPieces: 75, radius: 1215, boundary: [-332, 300] }),
]

import {
  homeClickEmoji,
  homeMemorySuccess,
} from '@/constants/tracking/pages/home'
import { generateCircleOfSvg } from '@/helpers/generateCircleOfSvg'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useEffect, useState } from 'react'
import DesktopIcon from './desktopCircles/DesktopIcon'

type Icon = {
  iconIndex: number
  x: number
  y: number
}
export default function DesktopCircles() {
  const [firstSelected, setFirstSelected] = useState<Icon | null>(null)
  const [secondSelected, setSecondSelected] = useState<Icon | null>(null)

  const [validatedIcons, setValidatedIcons] = useState<Icon[]>([])

  const [isWrong, setIsWrong] = useState(false)

  useEffect(() => {
    setFirstSelected(null)
    setSecondSelected(null)
  }, [])

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
