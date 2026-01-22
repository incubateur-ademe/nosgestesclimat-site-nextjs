'use client'

import Trans from '@/components/translation/trans/TransClient'
import { eauMetric } from '@/constants/model/metric'
import { formatFootprint } from '@/helpers/formatters/formatFootprint'
import { useRule } from '@/publicodes-state'
import { twMerge } from 'tailwind-merge'

interface Props {
  total?: number
  isSmall?: boolean
}
export default function WaterTotalNumber({ total, isSmall }: Props) {
  const hookValue = useRule('bilan', eauMetric).numericValue

  // Allow forcing the value to be displayed
  const usedValue = typeof total === 'number' ? total : hookValue

  const { formattedValue, unit } = formatFootprint(usedValue, {
    metric: eauMetric,
    localize: false,
  })

  // We round the value to the nearest hundred
  const realFormattedValue = (
    Math.round(Number(formattedValue) / 100) * 100
  ).toLocaleString('fr-FR')

  return (
    <div
      className={twMerge(
        'flex origin-top items-center justify-center pt-8 transition-transform duration-300 md:pt-12',
        isSmall ? 'md:scale-75 md:pt-4' : 'scale-100'
      )}>
      <div className="text-water text-center leading-0 font-medium whitespace-nowrap">
        <span className="mb flex items-baseline justify-center">
          <strong className="text-xl leading-none font-black md:text-4xl lg:text-6xl">
            {realFormattedValue}
          </strong>
           
          <span className="text-lg md:text-3xl lg:text-4xl lg:leading-tight">
            {unit}
          </span>
        </span>
        <span className="text-default block text-center text-xs md:-mt-3 md:text-lg lg:text-xl">
          <Trans>d'eau par jour</Trans>
        </span>
      </div>
    </div>
  )
}
