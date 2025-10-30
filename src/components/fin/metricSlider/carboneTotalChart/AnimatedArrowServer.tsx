'use client'

import { motion } from 'framer-motion'
import Arrow from './Arrow'

type Props = {
  position: number
  color: string
}

export default function AnimatedArrowServer({ position, color }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: '-400%' }}
      animate={{ opacity: 1, x: '-50%' }}
      transition={{ duration: 1.5 }}
      className="absolute bottom-10 z-10"
      style={{ left: `${position}%` }}
      aria-hidden="true">
      <Arrow style={{ fill: color }} aria-hidden="true" />
    </motion.div>
  )
}
