import Trans from '@/components/translation/Trans'
import { formatCarbonFootprint } from '@/helpers/formatCarbonFootprint'
import { getColorAtPosition } from '@/helpers/getColorOfGradient'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useRule } from '@/publicodes-state'
import { motion } from 'framer-motion'
import { CountUp } from 'use-count-up'
import Arrow from './Arrow'

export default function TotalNumber() {
  const { t } = useClientTranslation()

  const { numericValue } = useRule('bilan')

  const { formattedValue, unit } = formatCarbonFootprint(numericValue, {
    t,
    localize: false,
  })

  const position = (numericValue / 1000 / 12) * 100

  const color = getColorAtPosition(position / 100)
  const cssColor = `rgba(${color['r']},${color['g']},${color['b']},${color['a']})`

  return (
    <motion.div
      initial={{ opacity: 0, x: '-400%' }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.5 }}
      className="absolute bottom-10 z-10 -translate-x-1/2"
      style={{ left: `${position}%`, color: cssColor }}>
      <div className="absolute bottom-full left-1/2 mb-1 -translate-x-1/2 whitespace-nowrap text-right font-medium">
        <strong className="absolute  bottom-6 right-full -translate-x-4 text-6xl font-black leading-none lg:bottom-8 lg:text-9xl">
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
        <span className="text-5xl leading-[3rem] lg:text-6xl lg:leading-snug">
          {unit}
        </span>
        <br />
        <span className="lg:text-2xl lg:tracking-wider ">
          <Trans>de</Trans> CO₂e <Trans>par an</Trans>
        </span>
      </div>
      <Arrow style={{ fill: cssColor }} />
    </motion.div>
  )
}
