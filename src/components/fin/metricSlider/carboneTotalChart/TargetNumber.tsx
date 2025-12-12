'use client'

import Trans from '@/components/translation/trans/TransClient'
import { motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'
import Arrow from './Arrow'

const position = (2 / 12) * 100

interface Props {
  isSmall?: boolean
}
export default function TargetNumber({ isSmall }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 2 }}
      className={twMerge(
        'absolute top-8 -translate-x-1/2 text-left lg:top-10',
        isSmall && 'pointer-events-none opacity-0! delay-0!'
      )}
      style={{ left: `${position}%` }}
      aria-hidden="true">
      <div className="absolute top-full mt-1 whitespace-nowrap">
        <strong className="text-secondary-700 font-black">2 tonnes,</strong>
        <br />
        <span>
          <Trans>l'objectif pour 2050</Trans>
        </span>
      </div>
      <Arrow className="h-4 w-4 rotate-180" aria-hidden="true" />
    </motion.div>
  )
}
