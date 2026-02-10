'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  index: number
  children: ReactNode
}

export default function AnimatedAccordionItem({ index, children }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1, // Staggered delay based on index
        ease: [0.25, 0.1, 0.25, 1],
      }}>
      {children}
    </motion.div>
  )
}
