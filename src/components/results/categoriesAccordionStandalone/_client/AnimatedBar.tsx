'use client'

import { motion } from 'framer-motion'

interface Props {
  percentage: number
  delay?: number
  color?: string
  height?: number
}

/**
 * Client-side animated progress bar wrapper.
 * Uses framer-motion to animate the bar width from 0% to the target percentage.
 */
export default function AnimatedBar({
  percentage,
  delay = 0,
  color = 'bg-primary-700',
  height = 6,
}: Props) {
  return (
    <motion.div
      className={`${color} rounded-xl`}
      style={{ height }}
      initial={{ width: 0 }}
      animate={{ width: `${percentage}%` }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Smooth easing
      }}
    />
  )
}
