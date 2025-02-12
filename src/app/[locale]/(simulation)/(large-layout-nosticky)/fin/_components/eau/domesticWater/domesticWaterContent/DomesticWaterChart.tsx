import Trans from '@/components/translation/Trans'
import { eauMetric } from '@/constants/metric'
import { formatFootprint } from '@/helpers/formatters/formatFootprint'
import { useRule } from '@/publicodes-state'

const average = 149

export default function DomesticWaterChart() {
  const { numericValue } = useRule('logement . eau domestique', eauMetric)

  const { formattedValue, unit } = formatFootprint(numericValue, {
    metric: eauMetric,
  })

  return (
    <div className="mb-6 self-center">
      <div className="flex gap-4 rounded-xl bg-water p-4 lg:pr-8">
        <svg
          className="h-auto fill-white lg:w-14"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M37.7916 23.6907L24.197 1.45337L11.5996 23.5387C8.66632 28.2187 8.41032 34.304 11.4916 39.344C15.8716 46.508 25.309 48.808 32.573 44.4867C39.8343 40.1667 42.1716 30.86 37.7916 23.6907Z" />
        </svg>
        <p className="mb-0 text-white lg:text-xl">
          <Trans>Vous utilisez</Trans> <br className="hidden lg:inline" />
          <strong className="font-black">
            {formattedValue} <Trans>{unit}</Trans>
          </strong>{' '}
          <Trans>d’eau domestique par jour</Trans>
        </p>
      </div>
      <p className="mb-0 w-full text-center text-sm italic">
        <Trans>*La moyenne française est de</Trans> {average}{' '}
        <Trans>litres par jour</Trans>
      </p>
    </div>
  )
}
