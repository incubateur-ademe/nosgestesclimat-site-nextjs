'use client'

import Trans from '@/components/translation/trans/TransClient'
import { motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'
import WaterTotalNumber from './waterTotalChart/WaterTotalNumber'
import WaveContent from './waterTotalChart/WaveContent'

type Props = { total?: number; isSmall?: boolean }
export default function WaterTotalChart({ total, isSmall }: Props) {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={twMerge(
        'relative flex h-full w-full flex-1 flex-col justify-between overflow-hidden transition-all duration-300',
        isSmall ? 'mt-2 md:mt-4' : ''
      )}>
      <WaterTotalNumber total={total} isSmall={isSmall} />
      <p className="relative mx-2 mt-8 mb-0 hidden text-sm md:block">
        <Trans>Ce chiffre vous semble impressionnant ?</Trans>
      </p>
      <p className="relative mx-2 mt-2 mb-0 hidden text-sm md:block">
        <Trans>
          C'est pourtant bien l'eau qui sert à produire ce que vous consommez :
          votre empreinte eau, c'est l'impact de votre mode de vie sur les
          cycles naturels de l'eau.
        </Trans>
      </p>
      <WaveContent />
    </motion.div>
  )
}
