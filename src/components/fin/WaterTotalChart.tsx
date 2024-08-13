import { motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'
import WaterTotalNumber from './waterTotalChart/WaterTotalNumber'
import WaveContent from './waterTotalChart/WaveContent'

type Props = {
  isSmall?: boolean
}
export default function WaterTotalChart({ isSmall }: Props) {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={twMerge(
        'relative mt-7 flex h-full w-full flex-1 flex-col justify-between lg:mt-8',
        !isSmall && 'pointer-events-none'
      )}>
      <WaterTotalNumber isSmall={isSmall} />
      <WaveContent isSmall={isSmall} />
    </motion.div>
  )
}
