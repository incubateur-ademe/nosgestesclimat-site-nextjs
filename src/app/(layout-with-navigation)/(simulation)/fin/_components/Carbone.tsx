import MainSubcategories from '@/components/fin/MainSubcategories'
import { useRule } from '@/publicodes-state'
import { motion } from 'framer-motion'
import OtherWays from './carbone/OtherWays'
import Subcategories from './carbone/Subcategories'

export default function Carbone() {
  const { numericValue: total } = useRule('bilan')

  const isSmallFootprint = total < 4000

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="flex flex-1 flex-col gap-16">
      <MainSubcategories isLink={!isSmallFootprint} />

      {isSmallFootprint ? <OtherWays isSmallFootprint /> : <Subcategories />}
    </motion.div>
  )
}
