import { motion } from 'framer-motion'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  delay?: number
  duration?: number
}

export const Appear = ({ children, delay = 0 }: Props) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay }}
    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
  >
    {children}
  </motion.div>
)

export const FromBottom = ({ children, delay = 0 }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 200, scale: 0.3 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay }}
    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
  >
    {children}
  </motion.div>
)
export const FromTop = ({ children, delay = 0, duration }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: -50, scale: 0.3 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay, duration }}
    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
  >
    {children}
  </motion.div>
)
