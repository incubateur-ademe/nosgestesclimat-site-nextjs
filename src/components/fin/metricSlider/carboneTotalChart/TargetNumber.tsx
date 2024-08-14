import Trans from '@/components/translation/Trans'
import { motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'
import Arrow from './Arrow'

const position = (2 / 12) * 100

type Props = {
  isSmall?: boolean
}
export default function TargetNumber({ isSmall }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 2 }}
      className={twMerge(
        'absolute top-8 -translate-x-1/2 lg:top-10',
        isSmall && 'pointer-events-none !opacity-0 !delay-0'
      )}
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
