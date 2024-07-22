import Trans from '@/components/translation/Trans'
import { formatFootprint } from '@/helpers/formatters/formatFootprint'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import { useRule } from '@/publicodes-state'
import { Metric } from '@/publicodes-state/types'
import HeadingButtons from '../metricSlider/heading/HeadingButtons'

type Props = {
  metric: Metric
}

const duration = {
  carbone: <Trans>de CO₂e par an</Trans>,
  eau: <Trans>d'eau par jour</Trans>,
}
export default function TotalStickySlide({ metric }: Props) {
  const locale = useLocale()
  const { t } = useClientTranslation()

  const { numericValue } = useRule('bilan', metric)

  const { formattedValue, unit } = formatFootprint(numericValue, {
    t,
    locale,
    metric,
  })
  return (
    <div className="flex items-center justify-between rounded-xl border-2 border-primary-50 bg-gray-100 px-4 py-2 lg:rounded-tl-none">
      <div>
        <strong className="block text-4xl font-black leading-none lg:inline short:text-3xl">
          {formattedValue}
        </strong>
        <span className="block text-base font-medium lg:inline">
          {' '}
          <Trans>{unit}</Trans> {duration[metric]}
        </span>
      </div>
      <HeadingButtons size="sm" endPage />
    </div>
  )
}
