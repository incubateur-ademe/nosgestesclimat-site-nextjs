'use client'

import { motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'
import Arrow from './Arrow'

export default function AnimatedArrow({
  className,
  isSmall,
  position,
  color,
}: {
  className?: string
  isSmall?: boolean
  position: number
  color: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: isSmall ? '1rem' : '-400%' }}
      animate={{ opacity: 1, x: isSmall ? '1rem' : '-50%' }}
      transition={{ duration: 1.5 }}
      className={twMerge(
        'absolute bottom-8 z-10 transition-transform duration-300 lg:bottom-12',
        className
      )}
      style={{ left: isSmall ? '50%' : `${position}%` }}
      aria-hidden="true">
      <Arrow
        style={{ fill: color }}
        className={isSmall ? 'pointer-events-none opacity-0! duration-300' : ''}
        aria-hidden="true"
      />
    </motion.div>
  )
}
