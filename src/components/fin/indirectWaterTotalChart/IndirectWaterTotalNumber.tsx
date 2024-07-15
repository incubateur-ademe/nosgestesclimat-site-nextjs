import Trans from '@/components/translation/Trans'
import { formatWaterFootprint } from '@/helpers/formatWaterFootprint'
import { useRule } from '@/publicodes-state'

export default function IndirectWaterTotalNumber() {
  const { numericValue } = useRule('bilan . par jour', 'eau')

  const { formattedValue, unit } = formatWaterFootprint(numericValue)

  return (
    <div className="absolute right-0 top-0">
      <div className="mx-auto whitespace-nowrap text-right font-medium">
        <strong className="text-7xl font-black leading-none  lg:text-9xl">
          {formattedValue}
        </strong>{' '}
        <br />
        <span className="text-sm lg:text-2xl ">
          <Trans>
            {unit} d'eau{' '}
            <strong className="font-black text-secondary-700">indirecte</strong>{' '}
            par jour
          </Trans>
        </span>
      </div>
    </div>
  )
}
