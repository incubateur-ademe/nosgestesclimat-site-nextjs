/* eslint-disable */

'use client'

import { everyIcons } from '@/components/icons'
import { useIsClient } from '@/hooks/useIsClient'
import { useWindowSize } from '@/hooks/useWindowSize'
import Image from 'next/image'
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

export default function DesktopIcon({
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
    let timer: NodeJS.Timeout | undefined = undefined
    if (isClient) {
      timer = setTimeout(() => setIsHidden(false), 500)
    }
    return () => timer && clearTimeout(timer)
  })

  if (Math.abs(x) > windowWidth / 2 + 32) return null
  if (!isClient) return null

  return (
    <div
      onClick={isValidated ? () => '' : onClick}
      className={`absolute transition-opacity delay-500 duration-500 motion-reduce:transition-none 
         ${getOpacityClass(isHidden)}
      `}
      style={{
        transform: `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${scale})`,
        transitionDelay: `${delay}ms`,
      }}>
      <div
        className={`rounded-full transition-colors ${getBackgroundClass(
          isSelected,
          isWrong,
          isValidated
        )}`}>
        <IconComponent
          className={`transition-opacity delay-500 duration-500 ${getOpacityClass(
            isValidated
          )}`}
        />
        <Image
          src="/images/misc/petit-logo@3x.png"
          alt="Logo Nos Gestes Climat"
          width="64"
          height="64"
          className={`absolute left-1/2 top-1/2 h-auto w-2/3 -translate-x-1/2 -translate-y-1/2 brightness-0 invert transition-opacity delay-500 duration-500 
            ${getOpacityClass(!isValidated)}
          `}
        />
      </div>
    </div>
  )
}

const getOpacityClass = (isHidden: boolean) =>
  isHidden ? 'opacity-0' : 'opacity-100'

const getBackgroundClass = (
  isSelected: boolean,
  isWrong: boolean,
  isValidated: boolean
) => {
  if (isValidated) {
    return 'bg-green-500'
  }
  if (!isSelected) {
    return 'bg-transparent'
  }
  if (isWrong) {
    return 'bg-red-500'
  }
  return 'bg-primary-200'
}
