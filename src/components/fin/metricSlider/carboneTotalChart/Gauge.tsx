import { useRule } from '@/publicodes-state'
import { motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'
import TargetNumber from './TargetNumber'

export default function Gauge({
  isSmall,
  total,
}: {
  isSmall?: boolean
  total?: number
}) {
  const { numericValue } = useRule('bilan')

  const isOutOfRange = numericValue > 12000

  return (
    <div
      className={twMerge(
        'relative w-full transition-all duration-300',
        isSmall ? 'pointer-events-none h-0 opacity-0' : 'h-8 lg:h-12'
      )}>
      <div
        className="border-primary-100 relative h-full w-full overflow-hidden rounded-full border-2 lg:h-10"
        style={{ backgroundColor: '#f96f81' }}>
        <motion.div
          initial={{ scaleX: 1 }}
          animate={{ scaleX: isOutOfRange ? 0.5 : 1 }}
          transition={{ duration: 1, delay: 0.75 }}
          className="bg-total-chart absolute top-0 right-0 bottom-0 left-0 origin-left"
        />
      </div>
      <div
        className={twMerge(
          'absolute bottom-full left-0 text-xs',
          isSmall && 'opacity-0'
        )}>
        0
      </div>
      {!isOutOfRange ? (
        <div
          className={twMerge(
            'absolute right-0 bottom-full text-xs',
            isSmall && 'opacity-0'
          )}>
          12
        </div>
      ) : null}

      {!total ? <TargetNumber isSmall={isSmall} /> : null}
    </div>
  )
}
