import { motion } from 'framer-motion'
import Arrow from './Arrow'

export default function AnimatedArrow({
  isSmall,
  position,
  color,
}: {
  isSmall?: boolean
  position: number
  color: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: isSmall ? '1rem' : '-400%' }}
      animate={{ opacity: 1, x: isSmall ? '1rem' : '-50%' }}
      transition={{ duration: 1.5 }}
      className="absolute bottom-10 z-10 transition-transform duration-300"
      style={{ left: isSmall ? '50%' : `${position}%` }}>
      <Arrow
        style={{ fill: color }}
        className={isSmall ? 'pointer-events-none !opacity-0 duration-300' : ''}
      />
    </motion.div>
  )
}
