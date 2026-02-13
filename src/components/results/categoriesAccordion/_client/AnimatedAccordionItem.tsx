'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  index: number
  children: ReactNode
}

export default function AnimatedAccordionItem({ index, children }: Props) {
  const shouldReduceMotion = useReducedMotion()
  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.4,
        delay: shouldReduceMotion ? 0 : index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}>
      {children}
    </motion.div>
  )
}
