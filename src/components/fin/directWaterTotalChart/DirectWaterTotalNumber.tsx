import Trans from '@/components/translation/Trans'
import { formatWaterFootprint } from '@/helpers/formatWaterFootprint'
import { useRule } from '@/publicodes-state'

export default function DirectWaterTotalNumber() {
  const { numericValue } = useRule('logement . eau directe . par jour', 'eau')

  const { formattedValue, unit } = formatWaterFootprint(numericValue)

  return (
    <div className="flex items-center justify-center">
      <div className="text-water mx-auto whitespace-nowrap text-right font-medium">
        <strong className="font-black leading-none lg:text-8xl">
          {formattedValue}
        </strong>{' '}
        <span className="text-5xl leading-[3rem] lg:text-6xl lg:leading-tight">
          {unit}
        </span>
        <br />
        <span className="lg:text-xl ">
          <Trans>
            d'eau <strong className="font-black">directe</strong> par jour
          </Trans>
        </span>
      </div>
    </div>
  )
}
