'use client'

import Badge from '@/design-system/layout/Badge'
import Emoji from '@/design-system/utils/Emoji'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useRule } from '@/publicodes-state'
import { motion } from 'framer-motion'
import { formatValue } from 'publicodes'

export default function CategoryChartItem({
  category,
  maxValue,
}: {
  category: string
  maxValue: number
}) {
  const { t } = useClientTranslation()

  const { numericValue, icons, title } = useRule(category)

  const percentageOfMaxValue = 1 - (maxValue - numericValue) / maxValue

  const formattedValue = formatValue(numericValue / 1000, { precision: 1 })

  return (
    <li
      className="flex flex-col items-center justify-end gap-2"
      aria-label={t(
        'La catégorie {{title}} représente {{formattedValue}} tonnes de CO2 equivalent.',
        { formattedValue, title }
      )}>
      <Badge>
        <strong>{formattedValue}</strong> t
      </Badge>
      <div
        className="flex items-end"
        style={{ height: `calc(${percentageOfMaxValue} * 4rem)` }}>
        <motion.div
          className="w-[8px] rotate-180 rounded-lg bg-secondary"
          initial={{ height: 0, display: 'none' }}
          animate={{
            height: `calc(${percentageOfMaxValue} * 4rem)`,
            display: 'block',
          }}
          transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
        />
      </div>

      <Emoji className="mt-3 text-2xl" title={title}>
        {icons}
      </Emoji>
    </li>
  )
}
