'use client'
import type { ReactNode } from 'react'
import { useContext, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { FloatingElementDisplayedContext } from './FloatingElementDisplayedProvider'
import FloatingInfo from './pulsatingDot/FloatingInfo'

export default function PulsatingDot({
  className,
  carbonScore,
  waterScore,
  itemTitle,
  itemKey,
  floatingInfoOrientation,
  shouldDefaultDisplayFloatingInfo,
}: {
  className?: string
  carbonScore?: number
  waterScore?: number
  itemTitle: ReactNode
  itemKey: string
  floatingInfoOrientation?: 'left' | 'right'
  shouldDefaultDisplayFloatingInfo?: boolean
}) {
  const { floatingElementDisplayed, setFloatingElementDisplayed } = useContext(
    FloatingElementDisplayedContext
  )

  const [isHovered, setIsHovered] = useState(false)

  // Default open the floating info if the user is on mobile and the shouldDefaultDisplayFloatingInfo is true
  useEffect(() => {
    if (/* isMobile() && */ shouldDefaultDisplayFloatingInfo) {
      setFloatingElementDisplayed(itemKey)
      setIsHovered(true)
    }
  }, [shouldDefaultDisplayFloatingInfo, itemKey, setFloatingElementDisplayed])

  // Close the floating info if the user clicks on another dot
  useEffect(() => {
    if (floatingElementDisplayed !== itemKey && isHovered) {
      setIsHovered(false)
    }
  }, [floatingElementDisplayed, itemKey, isHovered])

  const handleEnter = () => {
    setIsHovered(true)
    setFloatingElementDisplayed(itemKey)
  }

  const handleLeave = () => {
    setIsHovered(false)
  }

  return (
    <div className={twMerge('absolute', className)}>
      {isHovered && (
        <FloatingInfo
          title={itemTitle}
          carbonScore={carbonScore}
          waterScore={waterScore}
          orientation={floatingInfoOrientation}
          className="left-0 top-0"
          key={`${itemKey}-floating-info`}
        />
      )}

      <div
        className={twMerge(
          'group absolute h-6 w-6 cursor-pointer rounded-full shadow-lg',
          'animate-pulse-bg'
        )}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        tabIndex={0}
        role="button"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleEnter()
          }
        }}
        onKeyUp={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleLeave()
          }
        }}
        // Handle touch events
        onTouchStart={handleEnter}
        aria-label="Toggle information">
        <div
          className={twMerge(
            'absolute inset-0 scale-[0.15] rounded-full bg-secondary-600 transition-all duration-300 group-hover:scale-[0.7]',
            isHovered ? 'scale-[0.7]' : ''
          )}
        />
      </div>
    </div>
  )
}
