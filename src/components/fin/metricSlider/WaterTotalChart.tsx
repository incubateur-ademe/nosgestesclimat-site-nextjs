import { motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'
import WaterTotalNumber from './waterTotalChart/WaterTotalNumber'
import WaveContent from './waterTotalChart/WaveContent'

type Props = {
  total?: number
  isSmall?: boolean
}
export default function WaterTotalChart({ total, isSmall }: Props) {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={twMerge(
        'relative flex h-full w-full flex-1 flex-col justify-between transition-all duration-300',
        isSmall && 'mt-0.5 lg:mt-0.5'
      )}>
      <WaterTotalNumber total={total} isSmall={isSmall} />
      <WaveContent />
    </motion.div>
  )
}
