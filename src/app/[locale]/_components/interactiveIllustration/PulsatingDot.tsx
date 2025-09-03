'use client'
import { useClientTranslation } from '@/hooks/useClientTranslation'
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

  const { t } = useClientTranslation()

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
          className="animate-fade-in top-0 left-0"
          key={`${itemKey}-floating-info`}
        />
      )}

      <div
        className={twMerge(
          'group absolute h-6 w-6 cursor-pointer rounded-full bg-white shadow-lg'
        )}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        tabIndex={-1}
        role="button"
        onTouchStart={handleEnter}
        aria-label={t(
          'common.interactiveIllustration.pulsatingDotLabel',
          "{{itemTitle}} : score de consommation carbone de {{carbonScore}} sur 5 et score de consommation d'eau de {{waterScore}} sur 5",
          {
            itemTitle,
            carbonScore,
            waterScore,
          }
        )}>
        <div
          className={twMerge(
            'bg-secondary-600 absolute inset-0 scale-[0.15] rounded-full transition-all duration-500',
            isHovered
              ? 'scale-[0.7]'
              : 'scale-[0.7] animate-[pulse-scale_3s_ease-in-out_infinite]'
          )}
        />
      </div>
    </div>
  )
}
