import Trans from '@/components/translation/Trans'
import { motion } from 'framer-motion'
import Arrow from './Arrow'

const position = (2 / 12) * 100

export default function TargetNumber() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 2 }}
      className="absolute top-10 -translate-x-1/2"
      style={{ left: `${position}%` }}>
      <div className="absolute top-full mt-1 whitespace-nowrap">
        <strong className="font-black text-secondary-700">2 tonnes,</strong>
        <br />
        <span>
          <Trans>l’objectif pour 2050</Trans>
        </span>
      </div>
      <Arrow className="h-4 w-4 rotate-180" />
    </motion.div>
  )
}
