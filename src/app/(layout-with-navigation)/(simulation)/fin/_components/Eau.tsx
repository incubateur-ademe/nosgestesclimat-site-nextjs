import IndirectWaterTotalChart from '@/components/fin/IndirectWaterTotalChart'
import { motion } from 'framer-motion'
import DirectWaterWarning from './eau/DirectWaterWarning'
import VigieEau from './eau/VigieEau'

export default function Eau() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="flex flex-1 flex-col gap-8">
      <VigieEau />
      <DirectWaterWarning />
      <IndirectWaterTotalChart />
    </motion.div>
  )
}
