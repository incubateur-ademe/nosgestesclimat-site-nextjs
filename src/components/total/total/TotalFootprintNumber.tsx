import Trans from '@/components/translation/Trans'
import { defaultMetric } from '@/constants/metric'
import { formatFootprint } from '@/helpers/formatters/formatFootprint'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import { useActions, useRule } from '@/publicodes-state'
import { Metric } from '@/publicodes-state/types'

type Props = {
  metric?: Metric
}

const duration = {
  carbone: <Trans>de CO₂e par an</Trans>,
  eau: <Trans>d'eau par jour</Trans>,
}
export default function TotalFootprintNumber({
  metric = defaultMetric,
}: Props) {
  const locale = useLocale()
  const { t } = useClientTranslation()

  const { numericValue: totalFootprintValue } = useRule('bilan', metric)

  const { totalChosenActionsValue } = useActions()

  const totalFootprintValueMinusActions =
    totalFootprintValue - totalChosenActionsValue

  const { formattedValue, unit } = formatFootprint(
    totalFootprintValueMinusActions,
    {
      t,
      locale,
      metric,
    }
  )

  const { formattedValue: formatedTotalFootprintValue } = formatFootprint(
    totalFootprintValue,
    {
      t,
      locale,
      metric,
    }
  )

  const shouldDisplayTotalWithoutActions =
    totalFootprintValue !== totalFootprintValueMinusActions

  return (
    <div>
      {shouldDisplayTotalWithoutActions && (
        <>
          <strong className="mr-4 block text-4xl font-black leading-none text-slate-500 line-through lg:inline short:text-3xl">
            {formatedTotalFootprintValue}
          </strong>
        </>
      )}
      <strong className="block text-4xl font-black leading-none lg:inline short:text-3xl">
        {formattedValue}
      </strong>
      <span className="block text-base font-medium lg:inline">
        {' '}
        <Trans>{unit}</Trans> {duration[metric]}
      </span>
    </div>
  )
}
