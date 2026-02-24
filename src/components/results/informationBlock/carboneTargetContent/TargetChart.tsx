'use client'

import Trans from '@/components/translation/trans/TransClient'
import { formatCarbonFootprint } from '@/helpers/formatters/formatCarbonFootprint'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import { useRule } from '@/publicodes-state'
import { motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'

interface Props {
  isQuestionOpen: boolean
}

export default function TargetChart({ isQuestionOpen }: Props) {
  const locale = useLocale()
  const { t } = useClientTranslation()

  const { numericValue: total } = useRule('bilan')

  const { formattedValue, unit } = formatCarbonFootprint(total, { locale, t })

  const currentYear = new Date().getFullYear()

  return (
    <div
      className={twMerge(
        'relative mx-auto max-w-[300px] transition-opacity duration-700',
        isQuestionOpen
          ? 'invisible h-0 opacity-0'
          : 'short:mb-2 short:mt-12 visible mt-14 mb-6 h-28 opacity-100'
      )}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2.5 }}
        className="absolute bottom-full left-3 translate-y-1">
        <div className="text-secondary-700 text-xs">{currentYear}</div>
        <div className="text-xl font-black">
          {formattedValue} {unit}
        </div>
        <div className="bg-secondary-700 absolute top-full right-full h-3 w-3 -translate-x-1 -translate-y-2/3 rounded-full" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2.9 }}
        className="absolute right-1 bottom-10">
        <div className="text-secondary-700 text-xs">2050</div>
        <div className="text-xl font-black">
          <Trans>2 tonnes</Trans>
        </div>
        <div className="bg-secondary-700 absolute top-full right-full h-3 w-3 -translate-x-1 -translate-y-2/3 rounded-full" />
      </motion.div>
      <div className="absolute w-7/12 origin-top-left rotate-[21deg] md:rotate-[24deg]">
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.75, delay: 2.5 }}
          className="bg-secondary-700 h-[2px] w-full origin-left">
          <svg
            width="16"
            height="15"
            viewBox="0 0 16 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-1/2 left-full -translate-y-1/2">
            <path
              d="M15.8229 7.44126L0.0737896 14.3695V0.513062L15.8229 7.44126Z"
              fill="#D40983"
            />
          </svg>
        </motion.div>
      </div>
    </div>
  )
}
