'use client'

import Trans from '@/components/translation/Trans'
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
}
export default function CarboneTotalChart({ total, isSmall }: Props) {
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
    <div className={twMerge(isSmall ? 'py-0' : 'pt-4 lg:pt-8')}>
      <div className="relative mx-auto w-full pt-28">
        <div
          className={twMerge(
            'absolute left-1/2 top-4  mb-4 -translate-x-1/2 whitespace-nowrap text-center font-medium transition-all duration-300',
            isSmall ? 'top-0  scale-75 lg:scale-50' : 'scale-100'
          )}
          style={{ color: cssColor }}>
          <p className="mb-0">
            <strong className="bottom-7 text-4xl font-black leading-none lg:bottom-7 lg:text-6xl">
              <CountUp
                isCounting
                end={Number(formattedValue)}
                duration={1.5}
                updateInterval={0.033}
                easing="linear"
                decimalSeparator=","
                thousandsSeparator=" "
              />
            </strong>{' '}
            <span className="text-3xl leading-[3rem] lg:text-4xl lg:leading-tight">
              {unit}
            </span>
          </p>
          <p className="mb-0 text-right text-default">
            <span className="text-lg lg:text-xl">
              <Trans>de</Trans> CO₂e <Trans>par an</Trans>
            </span>
          </p>
        </div>

        <div className="mt-4">
          <AnimatedArrow
            isSmall={isSmall}
            position={position}
            color={cssColor}
          />
          <Gauge isSmall={isSmall} total={total} />
        </div>
      </div>
    </div>
  )
}
