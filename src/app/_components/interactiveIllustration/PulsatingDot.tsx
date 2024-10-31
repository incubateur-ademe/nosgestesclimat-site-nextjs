'use client'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import FloatingInfo from './pulsatingDot/FloatingInfo'

export default function PulsatingDot({
  className,
  carbonScore,
  waterScore,
  itemTitle,
  floatingInfoOrientation,
}: {
  className?: string
  carbonScore?: number
  waterScore?: number
  itemTitle: ReactNode
  floatingInfoOrientation?: 'left' | 'right'
}) {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <div className={twMerge('absolute', className)}>
      {isHovered && (
        <FloatingInfo
          title={itemTitle}
          carbonScore={carbonScore}
          waterScore={waterScore}
          orientation={floatingInfoOrientation}
          className="left-0 top-0"
        />
      )}

      <div
        className={twMerge(
          'group absolute h-6 w-6 cursor-pointer rounded-full shadow-lg',
          'animate-pulse-bg'
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        tabIndex={0}
        role="button"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsHovered(true)
          }
        }}
        onKeyUp={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsHovered(false)
          }
        }}
        aria-label="Toggle information">
        <div className="absolute inset-0 scale-[0.15] rounded-full bg-secondary-600 transition-all duration-300 group-hover:scale-[0.7]" />
      </div>
    </div>
  )
}
