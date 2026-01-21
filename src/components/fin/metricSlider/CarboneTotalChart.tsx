'use client'

import Trans from '@/components/translation/trans/TransClient'
import { formatCarbonFootprint } from '@/helpers/formatters/formatCarbonFootprint'
import { getColorAtPosition } from '@/helpers/getColorOfGradient'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useRule } from '@/publicodes-state'
import { twMerge } from 'tailwind-merge'
import { CountUp } from 'use-count-up'
import AnimatedArrow from './carboneTotalChart/AnimatedArrow'
import Gauge from './carboneTotalChart/Gauge'

interface Props {
  className?: string
  total?: number
  isSmall?: boolean
  shouldShowOnlyGauge?: boolean
}

export default function CarboneTotalChart({
  className,
  total,
  isSmall,
  shouldShowOnlyGauge = false,
}: Props) {
  const hookValue = useRule('bilan').numericValue
  const usedValue = total ?? hookValue

  const { t } = useClientTranslation()

  const { formattedValue, unit } = formatCarbonFootprint(usedValue, {
    t,
    localize: false,
  })

  const originPosition = (usedValue / 1000 / 12) * 100

  const position = Math.min(Math.max(originPosition, 0), 100)

  const color = getColorAtPosition(position / 100)
  const cssColor = `rgba(${color.r},${color.g},${color.b},${color.a})`

  const targetValue = 2
  const maxValue = 12
  const currentValueInTons = usedValue / 1000
  const percentage = Math.min((currentValueInTons / maxValue) * 100, 100)

  const gaugeDescription = t(
    'endPage.carboneChart.gaugeDescription',
    `Graphique montrant votre empreinte carbone de ${formattedValue} ${unit} par an, soit ${Math.round(percentage)}% de l'échelle maximale. L'objectif 2050 est de ${targetValue} tonnes par an.`,
    {
      currentValue: formattedValue,
      unit,
      percentage: Math.round(percentage),
      targetValue,
      defaultValue: `Graphique montrant votre empreinte carbone de ${formattedValue} ${unit} par an, soit ${Math.round(percentage)}% de l'échelle maximale. L'objectif 2050 est de ${targetValue} tonnes par an.`,
    }
  )

  return (
    <div
      className={twMerge(
        'relative mx-auto flex w-full flex-col items-center justify-center',
        isSmall ? 'mt-2 md:mt-4' : '',
        className
      )}
      role="img"
      aria-label={gaugeDescription}
      aria-live="polite"
      aria-atomic="true">
      {!shouldShowOnlyGauge && (
        <div
          className={twMerge(
            'pt-8 text-center font-medium whitespace-nowrap transition-transform duration-300 md:pt-12',
            isSmall ? 'md:scale-75 md:pt-0' : 'scale-100'
          )}
          style={{ color: cssColor }}
          aria-hidden="true">
          <p className="mb-0 leading-none md:mb-1">
            <strong className="bottom-7 text-xl leading-none font-black md:text-4xl lg:bottom-7 lg:text-6xl">
              <CountUp
                isCounting
                end={Number(formattedValue)}
                duration={1.5}
                updateInterval={0.033}
                easing="linear"
                decimalSeparator=","
                thousandsSeparator=" "
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
          'mt-8 hidden w-full md:block',
          shouldShowOnlyGauge && 'block',
          isSmall && 'mt-0'
        )}
        role="progressbar"
        aria-valuenow={currentValueInTons}
        aria-valuemin={0}
        aria-valuemax={maxValue}
        aria-valuetext={`${formattedValue} ${unit} par an, ${Math.round(percentage)}% de l'échelle maximale`}
        aria-label={t(
          'endPage.carboneChart.progressBarLabel',
          'Barre de progression de votre empreinte carbone'
        )}>
        <AnimatedArrow isSmall={isSmall} position={position} color={cssColor} />
        <Gauge isSmall={isSmall} total={total} />
      </div>
    </div>
  )
}
