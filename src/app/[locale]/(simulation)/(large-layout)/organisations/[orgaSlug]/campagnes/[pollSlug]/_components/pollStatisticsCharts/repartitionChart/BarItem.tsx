'use client'

import { useClientTranslation } from '@/hooks/useClientTranslation'
import { twMerge } from 'tailwind-merge'

type Props = {
  value: number
  maxValue: number
  shouldBeHighlighted?: boolean
  id: string
  className?: string
}

export default function BarItem({
  value,
  maxValue,
  shouldBeHighlighted,
  id,
  className,
}: Props) {
  const { t } = useClientTranslation()

  const valueToDisplay = value / 1000

  return (
    <div
      data-tooltip-id={id}
      data-tooltip-content={t('{{value}} tonnes', {
        value: valueToDisplay.toFixed(1).replace('.', ','),
      })}
      className={twMerge(
        'bg-primary-700 absolute h-8 w-2 opacity-20 hover:scale-[10%]',
        shouldBeHighlighted
          ? 'bg-secondary-700! z-10! border-x border-white opacity-100!'
          : '',
        className
      )}
      style={{
        left: `${(valueToDisplay / maxValue) * 100}%`,
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    />
  )
}
