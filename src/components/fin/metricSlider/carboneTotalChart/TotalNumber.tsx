import Trans from '@/components/translation/Trans'
import { formatCarbonFootprint } from '@/helpers/formatters/formatCarbonFootprint'
import { getColorAtPosition } from '@/helpers/getColorOfGradient'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useRule } from '@/publicodes-state'
import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import { CountUp } from 'use-count-up'
import Arrow from './Arrow'

function getContentAlignement(position: number) {
  if (position < 40) {
    return 'left-16'
  }
  if (position < 50) {
    return '-left-6'
  }
  if (position < 80) {
    return 'left-1/2 -translate-x-1/2'
  }
  return 'right-0'
}

type Props = {
  total?: number
  isSmall?: boolean
}

export default function TotalNumber({ total, isSmall }: Props) {
  const { t } = useClientTranslation()

  const { numericValue } = useRule('bilan')

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
    <motion.div
      initial={{ opacity: 0, x: '-400%' }}
      animate={{ opacity: 1, x: '-50%' }}
      transition={{ duration: 1.5 }}
      className={twMerge(
        'absolute bottom-10 z-10 -translate-x-1/2 transition-transform duration-300'
      )}
      style={{ left: `${position}%`, color: cssColor }}>
      <div
        className={twMerge(
          'absolute bottom-full mb-1 origin-top whitespace-nowrap text-right font-medium transition-all duration-300',
          getContentAlignement(position),
          isSmall
            ? 'translate-y-2 scale-75 lg:translate-y-3 lg:scale-50'
            : 'scale-100'
        )}>
        <strong className="absolute bottom-7 right-full -translate-x-4 text-6xl font-black leading-none lg:bottom-7 lg:text-8xl">
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
        <span className="text-5xl leading-[3rem] lg:text-6xl lg:leading-tight">
          {unit}
        </span>
        <br />
        <span className="text-lg lg:text-xl">
          <Trans>de</Trans> CO₂e <Trans>par an</Trans>
        </span>
      </div>
      <Arrow
        style={{ fill: cssColor }}
        className={isSmall ? 'pointer-events-none !opacity-0 duration-300' : ''}
      />
    </motion.div>
  )
}
