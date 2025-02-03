import Trans from '@/components/translation/Trans'
import { eauMetric } from '@/constants/metric'
import { formatFootprint } from '@/helpers/formatters/formatFootprint'
import { useRule } from '@/publicodes-state'
import { twMerge } from 'tailwind-merge'

type Props = {
  total?: number
  isSmall?: boolean
}
export default function WaterTotalNumber({ total, isSmall }: Props) {
  const { numericValue } = useRule('bilan', eauMetric)

  const usedValue = total ?? numericValue

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
        isSmall ? 'md:scale-75 md:pt-10 lg:pt-4' : 'scale-100'
      )}>
      <div className="whitespace-nowrap text-center font-medium text-water md:text-right">
        <span className="flex items-baseline justify-center gap-1">
          <strong className="text-xl font-black leading-none md:text-4xl lg:text-6xl">
            {realFormattedValue}
          </strong>{' '}
          <span className="text-lg md:text-3xl lg:text-4xl lg:leading-tight">
            {unit}
          </span>
        </span>
        <span className="text-sm text-default md:text-lg lg:text-xl">
          <Trans>d'eau par jour</Trans>
        </span>
      </div>
    </div>
  )
}
