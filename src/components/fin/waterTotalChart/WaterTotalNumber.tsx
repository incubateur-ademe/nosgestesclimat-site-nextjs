import Trans from '@/components/translation/Trans'
import { formatFootprint } from '@/helpers/formatters/formatFootprint'
import { useRule } from '@/publicodes-state'

export default function WaterTotalNumber() {
  const { numericValue } = useRule('bilan', 'eau')

  const { formattedValue, unit } = formatFootprint(numericValue, {
    metric: 'eau',
  })

  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto whitespace-nowrap text-right font-medium text-water">
        <strong className="text-6xl font-black leading-none lg:text-8xl">
          {formattedValue}
        </strong>{' '}
        <span className="text-5xl leading-[3rem] lg:text-6xl lg:leading-tight">
          {unit}
        </span>
        <br />
        <span className="text-lg lg:text-xl">
          <Trans>
            d'eau <span className="text-secondary-700">par jour</span>
          </Trans>
        </span>
      </div>
    </div>
  )
}
