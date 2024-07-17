import MainSubcategories from '@/components/fin/MainSubcategories'
import { motion } from 'framer-motion'
import ClimateAndWater from './eau/ClimateAndWater'
import DomesticWater from './eau/DomesticWater'

export default function Eau() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="flex flex-1 flex-col gap-16">
      <MainSubcategories isLink={false} />
      <ClimateAndWater />
      <DomesticWater />
    </motion.div>
  )
}
