import { useRule } from '@/publicodes-state'
import { motion } from 'framer-motion'

export default function Gauge() {
  const { numericValue } = useRule('bilan')

  const isOutOfRange = numericValue > 12000

  return (
    <div className="h12 relative w-full">
      <div
        className="relative h-12 w-full overflow-hidden rounded-full border-2 border-primary-100"
        style={{ backgroundColor: '#f96f81' }}>
        <motion.div
          initial={{ scaleX: 1 }}
          animate={{ scaleX: isOutOfRange ? 0.5 : 1 }}
          transition={{ duration: 1, delay: 0.75 }}
          className="bg-total-chart absolute bottom-0 left-0 right-0 top-0 origin-left "
        />
      </div>
      <div className="absolute bottom-full left-0 text-xs">0</div>
      {!isOutOfRange ? (
        <div className="absolute bottom-full right-0 text-xs">12</div>
      ) : null}
    </div>
  )
}
