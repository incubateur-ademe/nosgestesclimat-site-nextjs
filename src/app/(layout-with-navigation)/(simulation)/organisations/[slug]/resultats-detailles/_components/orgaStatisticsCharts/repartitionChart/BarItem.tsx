'use client'

import formatCarbonFootprint from '@/helpers/formatCarbonFootprint'
import { useClientTranslation } from '@/hooks/useClientTranslation'

type Props = {
  value: number
  maxValue: number
  shouldBeHighlighted?: boolean
  id: string
}

export default function BarItem({
  value,
  maxValue,
  shouldBeHighlighted,
  id,
}: Props) {
  const { t } = useClientTranslation()

  return (
    <div
      data-tooltip-id={id}
      data-tooltip-content={t('{{value}} tonnes', {
        value: formatCarbonFootprint(value)?.formattedValue,
      })}
      className={`absolute h-8 w-2 bg-primary-500 opacity-20 hover:scale-[10%] ${
        shouldBeHighlighted
          ? '!bg-secondary-500 !z-10 border-x border-white !opacity-100'
          : ''
      }`}
      style={{
        left: `${(value / maxValue) * 100}%`,
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    />
  )
}
