import Trans from '@/components/translation/Trans'
import { formatFootprint } from '@/helpers/formatters/formatFootprint'
import { useRule } from '@/publicodes-state'
import { twMerge } from 'tailwind-merge'

type Props = {
  total?: number
  isSmall?: boolean
}
export default function WaterTotalNumber({ total, isSmall }: Props) {
  const { numericValue } = useRule('bilan', 'eau')

  const usedValue = total ?? numericValue

  const { formattedValue, unit } = formatFootprint(usedValue, {
    metric: 'eau',
    localize: false,
  })

  // We round the value to the nearest hundred
  const realFormattedValue = (
    Math.round(Number(formattedValue) / 100) * 100
  ).toLocaleString('fr-FR')

  return (
    <div
      className={twMerge(
        'flex origin-top items-center justify-center transition-transform duration-300',
        isSmall ? 'scale-75 lg:translate-y-2 lg:scale-50' : 'scale-100'
      )}>
      <div className="mx-auto whitespace-nowrap text-right font-medium text-water">
        <span className="flex items-end gap-4">
          <strong className="text-6xl font-black leading-none lg:text-8xl">
            {realFormattedValue}
          </strong>{' '}
          <span className="text-5xl leading-[3rem] lg:text-6xl lg:leading-tight">
            {unit}
          </span>
        </span>
        <span className="text-lg lg:text-xl">
          <Trans>
            d'eau <span className="text-secondary-700">par jour</span>
          </Trans>
        </span>
      </div>
    </div>
  )
}
