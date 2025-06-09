'use client'

import Trans from '@/components/translation/trans/TransClient'
import { formatCarbonFootprint } from '@/helpers/formatters/formatCarbonFootprint'
import { getColorAtPosition } from '@/helpers/getColorOfGradient'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useRule } from '@/publicodes-state'
import { useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import { CountUp } from 'use-count-up'
import AnimatedArrow from './carboneTotalChart/AnimatedArrow'
import Gauge from './carboneTotalChart/Gauge'

type Props = {
  total?: number
  isSmall?: boolean
  shouldShowOnlyGauge?: boolean
}
export default function CarboneTotalChart({
  total,
  isSmall,
  shouldShowOnlyGauge = false,
}: Props) {
  const { numericValue } = useRule('bilan')

  const { t } = useClientTranslation()

  const usedValue = total ?? numericValue

  const { formattedValue, unit } = formatCarbonFootprint(usedValue, {
    t,
    localize: false,
  })

  const originPosition = (usedValue / 1000 / 12) * 100

  const position = useMemo(() => {
    if (originPosition <= 0) {
      return 0
    }
    if (originPosition >= 100) {
      return 100
    }
    return originPosition
  }, [originPosition])

  const color = getColorAtPosition(position / 100)
  const cssColor = `rgba(${color['r']},${color['g']},${color['b']},${color['a']})`

  return (
    <div className="relative mx-auto flex w-full flex-col items-center justify-center">
      {!shouldShowOnlyGauge && (
        <div
          className={twMerge(
            'pt-8 text-center font-medium whitespace-nowrap transition-transform duration-300 md:pt-12',
            isSmall ? 'md:scale-75 md:pt-6 lg:pt-0' : 'scale-100'
          )}
          style={{ color: cssColor }}>
          <p className="mb-0 leading-none">
            <strong className="bottom-7 text-xl leading-none font-black md:text-4xl lg:bottom-7 lg:text-6xl">
              <CountUp
                isCounting
                end={Number(formattedValue)}
                duration={1.5}
                updateInterval={0.033}
                easing="linear"
                decimalSeparator=","
                thousandsSeparator=" "
              />
            </strong>
              
            <span className="text-lg md:text-3xl lg:text-4xl lg:leading-tight">
              {unit}
            </span>
          </p>

          <p className="text-default -mt-1 mb-0 text-center md:-mt-3">
            <span className="text-xs md:text-lg lg:text-xl">
              <Trans>de</Trans> CO₂e <Trans>par an</Trans>
            </span>
          </p>
        </div>
      )}

      <div
        className={twMerge(
          'mt-4 hidden w-full md:block',
          shouldShowOnlyGauge && 'block'
        )}>
        <AnimatedArrow isSmall={isSmall} position={position} color={cssColor} />
        <Gauge isSmall={isSmall} total={total} />
      </div>
    </div>
  )
}
