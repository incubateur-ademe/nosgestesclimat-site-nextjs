/* eslint-disable */

'use client'

import { everyIcons } from '@/components/icons'
import { useIsClient } from '@/hooks/useIsClient'
import { useWindowSize } from '@/hooks/useWindowSize'
import { MouseEventHandler, useEffect, useState } from 'react'

type Props = {
  iconIndex: any
  x: number
  y: number
  rotation: number
  delay: number
  scale?: number
  onClick?: MouseEventHandler<HTMLElement>
  isSelected?: boolean
  isWrong?: boolean
  isValidated?: boolean
}

export default function Icon({
  iconIndex,
  x,
  y,
  rotation,
  delay,
  scale = 1,
  onClick = () => '',
  isSelected = false,
  isWrong = false,
  isValidated = false,
}: Props) {
  const isClient = useIsClient()
  const { windowWidth } = useWindowSize()
  const IconComponent = everyIcons[iconIndex]

  const [isHidden, setIsHidden] = useState(true)
  useEffect(() => {
    let timer: any = null
    if (isClient) {
      timer = setTimeout(() => setIsHidden(false), 500)
    }
    return () => timer && clearTimeout(timer)
  })

  if (Math.abs(x) > windowWidth / 2 + 32) return null
  if (!isClient) return null

  return (
    <div
      onClick={onClick}
      className={`absolute rounded-full border-green-500 transition-opacity delay-500 duration-500 motion-reduce:transition-none 
        ${getBorderColor(isWrong, isValidated)} ${getBorderClass(
          isSelected
        )} ${getOpacityClass(isHidden)}
      `}
      style={{
        transform: `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${scale})`,
        transitionDelay: `${delay}ms`,
      }}>
      <IconComponent />
    </div>
  )
}

const getOpacityClass = (isHidden: boolean) =>
  isHidden ? 'opacity-0' : 'opacity-100'
const getBorderClass = (isSelected: boolean) => (isSelected ? 'border-4' : '')
const getBorderColor = (isWrong: boolean, isValidated: boolean) =>
  isValidated
    ? 'border-green-500'
    : isWrong
    ? 'border-red-500'
    : 'border-primary-500'
