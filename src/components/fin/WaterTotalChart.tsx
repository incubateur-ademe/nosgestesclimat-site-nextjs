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
        'relative mt-7 flex h-full w-full flex-1 flex-col justify-between transition-all duration-300 lg:mt-8',
        isSmall && 'mt-0.5 lg:mt-0.5'
      )}>
      <WaterTotalNumber isSmall={isSmall}/>
      <WaveContent />
    </motion.div>
  )
}
