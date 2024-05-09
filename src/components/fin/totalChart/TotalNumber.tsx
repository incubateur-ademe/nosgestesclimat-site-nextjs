import Trans from '@/components/translation/Trans'
import { formatCarbonFootprint } from '@/helpers/formatCarbonFootprint'
import { getColorAtPosition } from '@/helpers/getColorOfGradient'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useRule } from '@/publicodes-state'
import { motion } from 'framer-motion'
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
}

export default function TotalNumber({ total }: Props) {
  const { t } = useClientTranslation()

  const { numericValue } = useRule('bilan')

  const usedValue = total ?? numericValue

  const { formattedValue, unit } = formatCarbonFootprint(usedValue, {
    t,
    localize: false,
  })

  const originPosition = (usedValue / 1000 / 12) * 100

  const position = originPosition <= 100 ? originPosition : 100

  const color = getColorAtPosition(position / 100)
  const cssColor = `rgba(${color['r']},${color['g']},${color['b']},${color['a']})`

  return (
    <motion.div
      initial={{ opacity: 0, x: '-400%' }}
      animate={{ opacity: 1, x: '-50%' }}
      transition={{ duration: 1.5 }}
      className="absolute bottom-10 z-10 -translate-x-1/2"
      style={{ left: `${position}%`, color: cssColor }}>
      <div
        className={twMerge(
          'absolute bottom-full  mb-1 whitespace-nowrap text-right font-medium lg:left-1/2 lg:right-auto lg:-translate-x-1/2',
          getContentAlignement(position)
        )}>
        <strong className="absolute bottom-7 right-full -translate-x-4 text-6xl font-black leading-none lg:bottom-7 lg:text-9xl">
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
        <span className="text-lg tracking-wider lg:text-2xl ">
          <Trans>de</Trans> CO₂e <Trans>par an</Trans>
        </span>
      </div>
      <Arrow style={{ fill: cssColor }} />
    </motion.div>
  )
}
